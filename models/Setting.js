const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Setting extends Sequelize.Model {}
  Setting.init({
    // attributes
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'setting',
    hooks: {
      afterSync: function () {
        Setting.findOrCreate({ where: { id: 'temperature'}, defaults: { label: 'Temperature units', type: 'unit' }})
        Setting.findOrCreate({ where: { id: 'windSpeed'}, defaults: { label: 'Wind speed', type: 'unit' }})
        Setting.findOrCreate({ where: { id: 'precipitations'}, defaults: { label: 'Precipitations', type: 'unit' }})
        Setting.findOrCreate({ where: { id: 'pressure'}, defaults: { label: 'Pressure', type: 'unit' }})
        Setting.findOrCreate({ where: { id: 'floodWarning'}, defaults: { label: 'Flood warnings', type: 'alert' }})
        Setting.findOrCreate({ where: { id: 'stormWarning'}, defaults: { label: 'Storm warnings', type: 'alert' }})
      }
    }
  });

  return Setting
};
