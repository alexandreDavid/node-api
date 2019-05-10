// Get Database models
const models = require('../models')

// // Get all settings
exports.getSettings = async (_request, response, next) => {
  try {
    let settings = await models.Setting.findAll({ include: [ 'values' ] })

    response.status(200).json(settings)
  } catch (e) {
    next(e)
  }
}

// Get the settings of the user
exports.getSettingsForUser = async (request, response, next) => {
  try {
    const results = await models.UserSetting.findAll({ where: { userId: request.user.id }, attributes: { exclude: ['userId'] }})
    response.status(400).json('Bad request')
  } catch (e) {
    next(e)
  }
}

// // Update the user's settings
exports.updateSetting = async (request, response, next) => {
  const id = request.params.id
  const { key } = request.body

  try {
    // check if the couple id / value valids
    const value = await models.SettingValue.findOne({ where: { settingId: id, key } })
    if (!value) {
      return next({ status: 401, message: 'Bad request', stack: `id and value are not a valid couple` })
    }
    await models.UserSetting.upsert({ settingId: id, userId: request.user.id, key }, { returning: true })
    response.status(200).send(`Setting saved with ID: ${id}`)
  } catch (e) {
    next(e)
  }
}
