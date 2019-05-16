// Get Database models
const models = require('../models')

// // Get the user's organisation
exports.getOrganisation = async (request, response, next) => {
  try {
    const user = await models.User.findOne({ where: { id: request.user.sub }})
    const results = await models.Organisation.findByPk(user.organisationId)
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// // Get an organisation by hash
exports.getOrganisationByHash = async (request, response, next) => {
  try {
    const hash = request.params.hash
    const results = await models.Organisation.findOne({ where: { hash }})
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// // Update an existing area
exports.updateOrganisation = async (request, response, next) => {
  try {
    const { name } = request.body

    const user = await models.User.findOne({ where: { id: request.user.sub }})
    const organisation = await models.Organisation.findByPk(user.organisationId)
    const results = await organisation.update({ name })

    response.status(200).send(results)
  } catch (e) {
    next(e)
  }
}

exports.getOrganisationUsers = async (request, response, next) => {
  try {
    const user = await models.User.findOne({ where: { id: request.user.sub } })
    const results = await models.User.findAll({ where: { organisationId: user.organisationId }})
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}
