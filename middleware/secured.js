/**
 * Read the authorization token and call the Auth0 API to have the user
 *
 */
const request = require('request')

module.exports = function () {
  return function secured (req, response, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token) {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      request.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
        'auth': {
          'bearer': token
        }
      }, function (error, res, body) {
        const statusCode = res && res.statusCode
        if (statusCode === 200) {
          req.user = JSON.parse(body)
          return next()
        }
        return response.status(401).send('Unauthorized')
      })
    } else {
      return response.status(401).send('Unauthorized')
    }
  };
};
