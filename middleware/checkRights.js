const models = require('../models');

const hasRole = async (request, response, next, roles = []) => {
  try {
    const user = await models.User.findOne({ where: { id: request.user.sub } })
    if (!roles.includes(user.role)) {
      return response.status(403).json({message: 'Forbidden'})
    }
    next()
  } catch (e) {
    next(e)
  }
}

exports.isAdmin = async (request, response, next) => {
  await hasRole(request, response, next, ['ADMIN', 'SUPERADMIN'])
}

exports.isSuperAdmin = async (request, response, next) => {
  await hasRole(request, response, next, ['SUPERADMIN'])
}
