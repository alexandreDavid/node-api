// Get Database models
const models = require('../models')

// // Get all resource
exports.getResources = async (request, response, next) => {
  try {
    const results = await models.Resource.findAll({ where: {userId: request.user.id}, order: [['zIndex', 'DESC']] })
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// Get single resource by ID
exports.getResourceById = async (request, response, next) => {
  const id = parseInt(request.params.id)
  try {
    const results = await models.Resource.findOne({ where: { id, userId: request.user.id } })
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// Add a new resource
exports.addResource = async (request, response, next) => {
  try {
    const { id, opacity, time, zIndex } = request.body
    const results = await models.Resource.create({ id, opacity, time, zIndex, userId: request.user.id })
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// // Update an existing resource
exports.updateResource = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id)
    const { opacity, time, zIndex } = request.body

    await models.Resource.upsert({ id, userId: request.user.id, opacity, time, zIndex })

    response.status(200).send(`Resource saved with ID: ${id}`)
  } catch (e) {
    next(e)
  }
}

// // Delete a resource
exports.deleteResource = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id)

    await models.Resource.destroy({ where: {id, userId: request.user.id} })

    response.status(200).send(`Resource deleted with ID: ${id}`)
  } catch (e) {
    next(e)
  }
}
