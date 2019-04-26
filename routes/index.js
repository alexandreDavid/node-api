var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'DFMS' });
});

router.use('/areas', require('./areas'))
router.use('/user', require('./user'))
router.use('/dashboards', require('./dashboards'))
router.use('/basemaps', require('./basemaps'))
router.use('/dashboards', require('./dashboards'))
router.use('/resources', require('./resources'))
router.use('/settings', require('./settings'))

module.exports = router;
