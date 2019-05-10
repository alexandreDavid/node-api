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
      primaryKey: true
    },
    opacity: {
      type: Sequelize.INTEGER
    },
    time: {
      type: Sequelize.STRING
    },
    zIndex: {
      type: Sequelize.INTEGER
    }
  }, {
    sequelize,
    modelName: 'resource'
    // options
  });

  return Resource
};
