const Sequelize = require('sequelize');

module.exports = (sequelize, Setting) => {
  class SettingValue extends Sequelize.Model {}
  SettingValue.init({
    // attributes
    settingId: {
      type: Sequelize.STRING,
   
      references: {
        // This is a reference to another model
        model: Setting,
   
        // This is the column name of the referenced model
        key: 'id',
   
        // This declares when to check the foreign key constraint. PostgreSQL only.
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isdefault: {
      type: Sequelize.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'setting_value',
    hooks: {
      afterSync: function () {
        SettingValue.findOrCreate({ where: { settingId: 'temperature', key: 'C'}, defaults: { label: '°C', isdefault: true }})
        SettingValue.findOrCreate({ where: { settingId: 'temperature', key: 'F'}, defaults: { label: '°F', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'temperature', key: 'K'}, defaults: { label: 'K', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'windSpeed', key: 'kt'}, defaults: { label: 'kt', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'windSpeed', key: 'btf'}, defaults: { label: 'btf', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'windSpeed', key: 'm/s'}, defaults: { label: 'm/s', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'windSpeed', key: 'mph'}, defaults: { label: 'mph', isdefault: true }})
        SettingValue.findOrCreate({ where: { settingId: 'windSpeed', key: 'km/h'}, defaults: { label: 'km/h', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'precipitations', key: 'mh'}, defaults: { label: 'm/hr', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'precipitations', key: 'mmh'}, defaults: { label: 'mm/hr', isdefault: true }})
        SettingValue.findOrCreate({ where: { settingId: 'pressure', key: 'Pa'}, defaults: { label: 'Pa', isdefault: true }})
        SettingValue.findOrCreate({ where: { settingId: 'pressure', key: 'hPa'}, defaults: { label: 'hPa', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'floodWarning', key: 'true'}, defaults: { label: 'ON', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'floodWarning', key: ''}, defaults: { label: 'OFF', isdefault: true }})
        SettingValue.findOrCreate({ where: { settingId: 'stormWarning', key: 'true'}, defaults: { label: 'ON', isdefault: false }})
        SettingValue.findOrCreate({ where: { settingId: 'stormWarning', key: ''}, defaults: { label: 'OFF', isdefault: true }})
      }
    }
  });

  return SettingValue
};
