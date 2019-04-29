const express = require('express')
const router = express.Router()
const areaController = require('../controllers/areaController')
const checkJwt = require('../middleware/checkJwt');

router.get('/', checkJwt, areaController.getAreas)
router.get('/:id', checkJwt, areaController.getAreaById)
router.post('/', checkJwt, areaController.addArea)
router.put('/:id', checkJwt, areaController.updateArea)
router.delete('/:id', checkJwt, areaController.deleteArea)

module.exports = router
