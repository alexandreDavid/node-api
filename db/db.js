
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dfms_users',
  password: 'postgres',
  port: 5432,
})

module.exports = pool
