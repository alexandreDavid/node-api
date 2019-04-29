// Get Database pool
const pool = require('../db/db')

// // Get all area
exports.getAreas = async (request, response) => {
  pool.query('SELECT * FROM area WHERE user_id = $1 order by id', [request.user.sub], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get single area by ID
exports.getAreaById = async (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM area WHERE user_id = $1 AND id = $2', [request.user.sub, id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length === 1) {
      response.status(200).json(results.rows[0])
    } else {
      return response.status(404).send({ message: `Area ${id} not found.` });
    }
  })
}

// Add a new area
exports.addArea = async (request, response) => {
  const { name, type, geom, id_area } = request.body

  pool.query('INSERT INTO area (user_id, name, type, geom, id_area) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, type, geom, id_area', [request.user.sub, name, type, geom, id_area], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(results.rows[0])
  })
}

// // Update an existing area
exports.updateArea = async (request, response) => {
  const id = parseInt(request.params.id)
  const { name, type, geom, id_area } = request.body

  pool.query(
    'UPDATE area SET name = $1, type = $2, geom = $3, id_area = $4 WHERE user_id = $5 AND id = $6',
    [name, type, geom, id_area, request.user.sub, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Area modified with ID: ${id}`)
    }
  )
}

// // Delete a area
exports.deleteArea = async (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM area WHERE user_id = $1 AND id = $2', [request.user.sub, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Area deleted with ID: ${id}`)
  })
}
