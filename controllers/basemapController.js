// Get Database pool
const pool = require('../db/db')

// // Get all basemaps
exports.getBasemaps = async (request, response) => {
  pool.query('SELECT * FROM basemap order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get the basemap of the user
exports.getBasemap = async (request, response) => {
  pool.query('SELECT * FROM basemap WHERE id = (SELECT basemap_id FROM basemap_user where user_id = $1)', [request.user.sub], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length === 1) {
      response.status(200).json(results.rows[0])
    } else {
      // If no result, we take the default basemap
      pool.query('SELECT * FROM basemap WHERE isdefault is true', (error, results) => {
        if (error) {
          throw error
        }
        if (results.rows.length === 1) {
          const defaultBasemap = results.rows[0]
          pool.query('INSERT INTO basemap_user (user_id, basemap_id) VALUES ($1, $2)', [request.user.sub, defaultBasemap.id], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(defaultBasemap)
          })
        } else {
          response.status(404).send({ message: `Basemap for user ${request.user.sub} not found.` });
        }
      })
    }
  })
}

// // Update the user's basemap
exports.updateBasemap = async (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(
    'UPDATE basemap_user SET basemap_id = $1 WHERE user_id = $2',
    [id, request.user.sub],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
