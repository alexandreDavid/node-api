const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Organisation extends Sequelize.Model {}
  Organisation.init({
    // attributes
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    link: {
      type: Sequelize.INTEGER
    }
  }, {
    sequelize,
    modelName: 'organisation'
    // options
  });

  return Organisation
};
