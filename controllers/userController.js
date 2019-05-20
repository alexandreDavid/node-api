// TODO: replace by axios
const request = require('request')
const models = require('../models')
var jwtDecode = require('jwt-decode');
const crypto = require('crypto');
const managementApi = require('../middleware/managementApi');

function responseHandler (resp, err, data, cb) {
  if (err) throw new Error(err);

  var errObj;

  if (!err && !data) {
    return resp.status(400).send('Something went wrong');
  }

  if (!err && data.err) {
    err = data.err;
    data = null;
  }

  if (!err && data.error) {
    err = data;
    data = null;
  }

  if (!err && data.statusCode && data.statusCode !== 200) {
    err = data;
    data = null;
  }

  if (err) {
    errObj = {
      original: err
    };

    if (err.response && err.response.statusCode) {
      errObj.statusCode = err.response.statusCode;
    }

    if (err.response && err.response.statusText) {
      errObj.statusText = err.response.statusText;
    }

    if (err.response && err.response.body) {
      err = err.response.body;
    }

    if (err.err) {
      err = err.err;
    }
    errObj.code = err.error || err.code || err.error_code || err.status || null;
    errObj.description =
      err.errorDescription ||
      err.error_description ||
      err.description ||
      err.error ||
      err.details ||
      err.err ||
      null;

    if (err.name) {
      errObj.name = err.name;
    }

    if (err.policy) {
      errObj.policy = err.policy;
    }

    if (err.message) {
      errObj.message = err.message;
    }

    if (errObj.statusCode) {
      return resp.status(errObj.statusCode).send(errObj);
    }

    return resp.status(400).send(errObj);
  }

  return cb()
}

// // Get all basemaps
exports.login = async (req, response) => {
  const { username, password } = req.body
  var options = {
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: 
    { grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
      username,
      password,
      audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      scope: 'openid',
      client_id: process.env.AUTH0_CLIENT_ID,
      realm: 'Username-Password-Authentication'},
    json: true };

  request.post(options, function (error, _resp, body) {
    responseHandler(response, error, body, async () => {
      let expiresAt = JSON.stringify(
        body.expires_in * 1000 + new Date().getTime()
      )

      // If the user doesn't exist in the DB, we create him
      const decoded = jwtDecode(body.id_token)
      const user = await models.User.findOne({ where: { id: decoded.sub }})

      if (!user) {
        const authUser = await managementApi.getUser(decoded.sub)
        // We have to get the organisation name from the Auth0 DB
        const organisation = await models.Organisation.create({ hash: crypto.createHash('sha256').digest('hex'), name: authUser.user_metadata.organisation })
        models.User.create({ id: authUser.user_id, name: authUser.user_metadata.name, email: authUser.email, position: authUser.user_metadata.position, role: 'ADMIN', organisationId: organisation.id })
      }

      return response.status(200).send({
        idToken: body.id_token,
        expiresAt: expiresAt
      });
    })
  });
}

exports.changePassword = async (req, response) => {
  const { email } = req.body
  var options = {
    url: `https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`,
    headers: { 'content-type': 'application/json' },
    body: 
    { email,
      client_id: process.env.AUTH0_CLIENT_ID,
      connection: 'Username-Password-Authentication'},
    json: true };

  request.post(options, function (error, _resp, body) {
    responseHandler(response, error, body, () => {
      return response.status(200).send(body);
    })
  });
}

exports.signup = async (req, response) => {
  const { email, password, metadata, hash } = req.body

  let organisation
  let role
  if (hash) {
    organisation = await models.Organisation.findOne({ where: { hash }})
    role = 'GUEST'
  } else {
    organisation = await models.Organisation.create({ hash: crypto.createHash('sha256').digest('hex'), name: metadata.organisation })
    role = 'ADMIN'
  }
  var options = {
    url: `https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`,
    headers: { 'content-type': 'application/json' },
    body: {
      email,
      password,
      user_metadata: metadata,
      client_id: process.env.AUTH0_CLIENT_ID,
      connection: 'Username-Password-Authentication'
    },
    json: true };

  request.post(options, function (error, _resp, body) {
    responseHandler(response, error, body, () => {
      // save in our DB
      models.User.create({ id: `auth0|${body._id}`, name: metadata.name, position: metadata.position, email, role, organisationId: organisation.id })
      return response.status(200).send(body);
    })
  });
}

exports.isAdmin = async (request, response, next) => {
  try {
    // check if the couple id / value valids
    const user = await models.User.findOne({ where: { id: request.user.sub } })
    response.status(200).send(user.role === 'ADMIN')
  } catch (e) {
    next(e)
  }
}
