// Get Database pool
const pool = require('../db/db')

// // Get all dashboards
exports.getDashboards = async (request, response) => {
  pool.query('SELECT * FROM dashboard WHERE user_id = $1', [request.user.sub], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get single dashboard by ID
exports.getDashboardById = async (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM dashboard WHERE user_id = $1 AND id = $2', [request.user.sub, id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length === 1) {
      response.status(200).json(results.rows[0])
    } else {
      return response.status(404).send({ message: `Dashboard ${id} not found.` });
    }
  })
}

// Add a new dashboard
exports.addDashboard = async (request, response) => {
  const { title, description, layout } = request.body

  pool.query('INSERT INTO dashboard (user_id, title, description, layout) VALUES ($1, $2, $3, $4) RETURNING id', [request.user.sub, title, description, layout], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

// // Update an existing dashboard
exports.updateDashboard = async (request, response) => {
  const id = parseInt(request.params.id)
  const { title, description } = request.body

  pool.query(
    'UPDATE dashboard SET title = $1, description = $2 WHERE user_id = $3 AND id = $4',
    [title, description, request.user.sub, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// // Delete a dashboard
exports.deleteDashboard = async (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM dashboard WHERE user_id = $2 AND id = $1', [request.user.sub, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
