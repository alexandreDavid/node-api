const express = require('express')
const router = express.Router()
const resourceController = require('../controllers/resourceController')
const checkJwt = require('../middleware/checkJwt');

router.get('/', checkJwt, resourceController.getResources)
router.get('/:id', checkJwt, resourceController.getResourceById)
router.post('/', checkJwt, resourceController.addResource)
router.put('/:id', checkJwt, resourceController.updateResource)
router.delete('/:id', checkJwt, resourceController.deleteResource)

module.exports = router
