const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Area extends Sequelize.Model {}
  Area.init({
    // attributes
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    idArea: {
      type: Sequelize.INTEGER
    },
    geom: {
      type: Sequelize.ARRAY(Sequelize.JSON)
    }
  }, {
    sequelize,
    modelName: 'area'
  });

  return Area
};
