const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Dashboard extends Sequelize.Model {}
  Dashboard.init({
    // attributes
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    layout: {
      type: Sequelize.JSON
    },
    widgets: {
      type: Sequelize.ARRAY(Sequelize.JSON)
    },
    shared: {
      type: Sequelize.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'dashboard'
  });

  return Dashboard
};