const models = require('../models');

exports.isSuperAdmin = async (request, response, next) => {
  try {
    const user = await models.User.findOne({ where: { id: request.user.sub } })
    if (!user.role === 'SUPERADMIN') {
      return response.status(403).json({message: 'Forbidden'})
    }
    next()
  } catch (e) {
    next(e)
  }
}
