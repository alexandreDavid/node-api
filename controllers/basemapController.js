// Get Database models
const models = require('../models')

// // Get all basemaps
exports.getBasemaps = async (request, response, next) => {
  try {
    const results = await models.Basemap.findAll({ order: [['id']] })
    response.status(200).json(results)
  } catch (e) {
    next(e)
  }
}

// Get the basemap of the user
exports.getBasemap = async (request, response, next) => {
  try {
    let user = await models.User.findOne({ where: { id: request.user.id }, include: [ models.Basemap ] })
    // user = user.get(0)

    if (!user.basemap) {
      user.basemap = await models.Basemap.findOne({ where: {isdefault: true} })
      user.basemapId = user.basemap.id
      await user.save({fields: ['basemapId']})
    }

    response.status(200).json(user.basemap)
  } catch (e) {
    next(e)
  }
}

// // Update the user's basemap
exports.updateBasemap = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id)
    let user = await models.User.findOne({ where: { id: request.user.id }})
    user.basemapId = parseInt(request.params.id)
    await user.save({fields: ['basemapId']})

    response.status(200).json(`User basemap modified with ID: ${id}`)
  } catch (e) {
    next(e)
  }
}
