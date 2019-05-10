// Get Database models
const models = require('../models')

module.exports = async (request, _response, next) => {
  try {
    let [user] = await models.User.findOrCreate({ where: { id: request.user.sub }})
    request.user = user.get(0)
    next()
  } catch (e) {
    next(e)
  }
}