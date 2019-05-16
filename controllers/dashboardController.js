// Get Database models
const models = require('../models')

// // Get all dashboards
exports.getDashboards = async (request, response, next) => {
  try {
    const dashboards = await models.Dashboard.findAll({ where: { userId: request.user.sub }, order: [['id']] , attributes: { exclude: ['userId'] }})
    response.status(200).json(dashboards)
  } catch (e) {
    next(e)
  }
}

// Get single dashboard by ID
exports.getDashboardById = async (request, response, next) => {
  const id = parseInt(request.params.id)

  try {
    const dashboard = await models.Dashboard.findOne({ where: { id, userId: request.user.sub }, attributes: { exclude: ['userId'] }})
    response.status(200).json(dashboard)
  } catch (e) {
    next(e)
  }
}

// Add a new dashboard
exports.addDashboard = async (request, response, next) => {
  try {
    const { title, description, layout, widgets } = request.body
    const dashboard = await models.Dashboard.create({ title, description, layout, widgets, userId: request.user.sub }, { attributes: { exclude: ['userId'] }})
    response.status(201).json(dashboard)
  } catch (e) {
    next(e)
  }
}

// // Update an existing dashboard
exports.updateDashboard = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id)
    const { title, description, layout, widgets } = request.body

    const dashboard = await models.Dashboard.findOne({ where: { id, userId: request.user.sub }, attributes: { exclude: ['userId'] }})
    const results = await dashboard.update({ title, description, layout, widgets })

    response.status(200).send(results)
  } catch (e) {
    next(e)
  }
}

// // Delete a dashboard
exports.deleteDashboard = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id)

    await models.Area.destroy({ where: { id, userId: request.user.sub } })

    response.status(200).send(`Resource deleted with ID: ${id}`)
  } catch (e) {
    next(e)
  }
}
