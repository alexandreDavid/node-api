var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DFMS' });
});

router.use('/areas', require('./areas'))
router.use('/dashboards', require('./dashboards'))
router.use('/basemaps', require('./basemaps'))

module.exports = router;
