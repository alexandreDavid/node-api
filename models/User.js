const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    // attributes
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  }, {
    sequelize,
    modelName: 'user'
    // options
  });

  return User
};
