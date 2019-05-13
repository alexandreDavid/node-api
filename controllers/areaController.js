// Get Database models
const models = require('../models')

// // Get all area
exports.getAreas = async (request, response, next) => {
  try {
    const results = await models.Area.findAll({ where: { userId: request.user.id }, attributes: { exclude: ['userId'] }})
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// Get single area by ID
exports.getAreaById = async (request, response, next) => {
  const id = parseInt(request.params.id)
  try {
    const results = await models.Area.findOne({ where: {id, userId: request.user.id}, attributes: { exclude: ['userId'] }})
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// Add a new area
exports.addArea = async (request, response, next) => {
  try {
    const { name, type, geom, idArea } = request.body
    const area = await models.Area.create({ name, type, geom, idArea, userId: request.user.id })
    response.status(200).json(await models.Area.findOne({ where: {id: area.id, userId: request.user.id}, attributes: { exclude: ['userId'] }}))
  } catch (e) {
    next(e)
  }
}

// // Update an existing area
exports.updateArea = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id)
    const { name, type, geom, idArea } = request.body

    const area = await models.Area.findOne({ where: {id, userId: request.user.id}, attributes: { exclude: ['userId'] }})
    const results = await area.update({ name, type, geom, idArea })

    response.status(200).send(results)
  } catch (e) {
    next(e)
  }
}

// // Delete a area
exports.deleteArea = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id)

    await models.Area.destroy({ where: {id, userId: request.user.id} })

    response.status(200).send(`Resource deleted with ID: ${id}`)
  } catch (e) {
    next(e)
  }
}
