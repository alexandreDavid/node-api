const managementApi = require('../middleware/managementApi');
const { Parser } = require('json2csv');

exports.getAllUsers = async (request, response, next) => {
  try {
    response.status(200).send(await managementApi.getUsers())
  } catch (e) {
    next(e)
  }
}

exports.getUsersCsv = async (req, response, next) => {
  try {
    const fields = ['id', 'email', 'email_verified', 'name', 'organisation', 'position', 'created_at', 'updated_at', 'last_login'];
    const opts = { fields };
    const parser = new Parser(opts);
    const data = await managementApi.getUsers()
    const csv = parser.parse(data.map(user => {
      user.user_metadata = user.user_metadata || {}
      return {
        id: user.user_id,
        email: user.email,
        email_verified: user.email_verified,
        name: user.user_metadata.name,
        organisation: user.user_metadata.organisation,
        position: user.user_metadata.position,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login: user.last_login
      }
    }));
    response.attachment('dfms-users.csv');
    response.status(200).send(csv);
  } catch (e) {
    next(e)
  }
}
