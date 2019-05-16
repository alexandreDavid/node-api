const express = require('express')
const router = express.Router()
const organisationController = require('../controllers/organisationController')
const checkJwt = require('../middleware/checkJwt');

router.get('/', checkJwt, organisationController.getOrganisation)
router.get('/hash/:hash', organisationController.getOrganisationByHash)
router.put('/', checkJwt, organisationController.updateOrganisation)
router.get('/users', checkJwt, organisationController.getOrganisationUsers)

module.exports = router
