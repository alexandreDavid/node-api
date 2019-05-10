const express = require('express')
const router = express.Router()
const resourceController = require('../controllers/resourceController')
const checkJwt = require('../middleware/checkJwt');
const defineUser = require('../middleware/defineUser');

router.get('/', checkJwt, defineUser, resourceController.getResources)
router.get('/:id', checkJwt, defineUser, resourceController.getResourceById)
router.post('/', checkJwt, defineUser, resourceController.addResource)
router.put('/:id', checkJwt, defineUser, resourceController.updateResource)
router.delete('/:id', checkJwt, defineUser, resourceController.deleteResource)

module.exports = router
