const express = require('express')
const router = express.Router()
const basemapController = require('../controllers/basemapController')
const checkJwt = require('../middleware/checkJwt');

router.get('/', basemapController.getBasemaps)
router.get('/active', checkJwt, basemapController.getBasemap)
router.put('/active/:id', checkJwt, basemapController.updateBasemap)

module.exports = router
