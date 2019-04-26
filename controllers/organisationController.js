// Get Database pool
const models = require('../models')

// // Get all area
exports.getOrganisation = async (request, response, next) => {
  try {
    const results = await models.Organisation.findByPk({ where: {userId: request.user.sub}, order: [['zIndex', 'DESC']] })
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// Add a new area
exports.add2Organisation = async (request, response, next) => {
  try {
    const { id, opacity, time, zIndex } = request.body
    const results = await models.Resource.create({ id, opacity, time, zIndex, userId: request.user.sub })
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// // Update an existing area
exports.updateOrganisation = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id)
    const { opacity, time, zIndex } = request.body

    const resource = await models.Resource.findOne({ where: {id, userId: request.user.sub} })
    const results = await resource.update({ id, opacity, time, zIndex })

    response.status(200).send(results)
  } catch (e) {
    next(e)
  }
}

exports.getOrganisationUsers = async (request, response, next) => {
  try {
    const { id, opacity, time, zIndex } = request.body
    const results = await models.Resource.create({ id, opacity, time, zIndex, userId: request.user.sub })
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}
