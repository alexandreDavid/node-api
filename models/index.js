var Sequelize = require('sequelize');
var db        = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Resource = require('./Resource')(sequelize)

module.exports = db;
