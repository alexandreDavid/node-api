const express = require('express')
const router = express.Router()
const basemapController = require('../controllers/basemapController')
const secured = require('../middleware/secured');

router.get('/', basemapController.getBasemaps)
router.get('/active', secured(), basemapController.getBasemap)
router.put('/active/:id', secured(), basemapController.updateBasemap)

module.exports = router
