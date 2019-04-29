// Get Database pool
const pool = require('../db/db')

// // Get all dashboards
exports.getDashboards = async (request, response) => {
  pool.query('SELECT * FROM dashboard WHERE user_id = $1 order by id', [request.user.sub], (error, results) => {
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
  const { title, description, layout, widgets } = request.body

  pool.query('INSERT INTO dashboard (user_id, title, description, layout, widgets) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, description, layout, widgets', [request.user.sub, title, description, layout, widgets], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(results.rows[0])
  })
}

// // Update an existing dashboard
exports.updateDashboard = async (request, response) => {
  const id = parseInt(request.params.id)
  const { title, description, layout, widgets } = request.body

  pool.query(
    'UPDATE dashboard SET title = $1, description = $2, layout = $3, widgets = $4 WHERE user_id = $5 AND id = $6',
    [title, description, layout, widgets, request.user.sub, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Dashboard modified with ID: ${id}`)
    }
  )
}

// // Delete a dashboard
exports.deleteDashboard = async (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM dashboard WHERE user_id = $1 AND id = $2', [request.user.sub, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Dashboard deleted with ID: ${id}`)
  })
}
