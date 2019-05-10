const express = require('express')
const router = express.Router()
const basemapController = require('../controllers/basemapController')
const checkJwt = require('../middleware/checkJwt');
const defineUser = require('../middleware/defineUser');

router.get('/', basemapController.getBasemaps)
router.get('/active', checkJwt, defineUser, basemapController.getBasemap)
router.put('/active/:id', checkJwt, defineUser, basemapController.updateBasemap)

module.exports = router
