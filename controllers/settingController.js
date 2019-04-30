// Get Database pool
const pool = require('../db/db')

// // Get all settings
exports.getSettings = async (_request, response, next) => {
  try {
    const results = await pool.query('SELECT * FROM setting')
    Promise.all(
      results.rows.map(async setting => {
        const values = await pool.query('SELECT * FROM setting_value where setting_id = $1', [setting.id])
        return setting.values = values.rows
      })
    ).then(() => {
      response.status(200).json(results.rows)
    })
  } catch (e) {
    next(e)
  }
}

// Get the settings of the user
exports.getSettingsForUser = async (request, response, next) => {
  try {
    const results = await pool.query('SELECT * FROM setting_user where user_id = $1', [request.user.sub])
    response.status(200).json(results.rows)
  } catch (e) {
    next(e)
  }
}

// // Update the user's settings
exports.updateSetting = async (request, response, next) => {
  const id = request.params.id
  const { key } = request.body

  try {
    const results = await pool.query(
      `INSERT INTO setting_user AS su (setting_id, user_id, key) VALUES ($1, $2, $3)
          ON CONFLICT ON CONSTRAINT setting_user_pkey DO UPDATE
          SET key = $3
          WHERE su.setting_id = $1 and su.user_id = $2
          RETURNING *`,
      [id, request.user.sub, key])
    response.status(200).send(results.rows[0])
  } catch (e) {
    next(e)
  }
}
