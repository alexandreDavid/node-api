const Sequelize = require('sequelize');


module.exports = (sequelize) => {
  class Basemap extends Sequelize.Model {}
  Basemap.init({
    label: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    isdefault: {
      type: Sequelize.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'basemap',
    hooks: {
      afterSync: function () {
        Basemap.findOrCreate({ where: { label: 'Openstreetmap'}, defaults: { url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', isdefault: true }})
        Basemap.findOrCreate({ where: { label: 'Grayscale'}, defaults: { url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', isdefault: false }})
        Basemap.findOrCreate({ where: { label: 'Nothing'}, defaults: { url: false, isdefault: false }})
      }
    }
  });

  return Basemap
};
