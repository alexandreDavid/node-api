const express = require('express')
const router = express.Router()
const areaController = require('../controllers/areaController')
const checkJwt = require('../middleware/checkJwt');
const defineUser = require('../middleware/defineUser');

router.get('/', checkJwt, defineUser, areaController.getAreas)
router.get('/:id', checkJwt, defineUser, areaController.getAreaById)
router.post('/', checkJwt, defineUser, areaController.addArea)
router.put('/:id', checkJwt, defineUser, areaController.updateArea)
router.delete('/:id', checkJwt, defineUser, areaController.deleteArea)

module.exports = router
