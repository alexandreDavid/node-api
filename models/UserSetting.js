const Sequelize = require('sequelize');

module.exports = (sequelize, Setting, User) => {
  class UserSetting extends Sequelize.Model {}
  UserSetting.init({
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
    userId: {
      type: Sequelize.STRING,
   
      references: {
        // This is a reference to another model
        model: User,
   
        // This is the column name of the referenced model
        key: 'id',
   
        // This declares when to check the foreign key constraint. PostgreSQL only.
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    key: {
      type: Sequelize.STRING
      // TODO refer to settingValue
    }
  }, {
    indexes: [
      // Create a unique index on settingId and userId
      {
        unique: true,
        fields: ['settingId', 'userId']
      }
    ],
    sequelize,
    modelName: 'user_setting'
  });

  return UserSetting
};
