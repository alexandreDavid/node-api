const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Resource extends Sequelize.Model {}
  Resource.init({
    // attributes
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    opacity: {
      type: Sequelize.INTEGER
    },
    time: {
      type: Sequelize.STRING
    },
    zIndex: {
      type: Sequelize.INTEGER,
      field: 'z_index'
    }
  }, {
    sequelize,
    modelName: 'resource'
    // options
  });

  return Resource
};
