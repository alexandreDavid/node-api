const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Organisation extends Sequelize.Model {}
  Organisation.init({
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hash: {
      type: Sequelize.STRING
    }
  }, {
    sequelize,
    modelName: 'organisation'
    // options
  });

  return Organisation
};
