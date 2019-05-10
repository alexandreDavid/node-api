var Sequelize = require('sequelize');
var db        = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Area = require('./Area')(sequelize)
db.Basemap = require('./Basemap')(sequelize)
db.Dashboard = require('./Dashboard')(sequelize)
db.Resource = require('./Resource')(sequelize)
db.Setting = require('./Setting')(sequelize)
db.SettingValue = require('./SettingValue')(sequelize, db.Setting)
db.User = require('./User')(sequelize)
db.UserSetting = require('./UserSetting')(sequelize, db.Setting, db.User)

db.Area.belongsTo(db.User);
db.Dashboard.belongsTo(db.User);
db.User.belongsTo(db.Basemap);
db.User.hasMany(db.Area);
db.Resource.belongsTo(db.User);
db.SettingValue.belongsTo(db.Setting);
db.Setting.hasMany(db.SettingValue, { as: 'values' });

module.exports = db;
