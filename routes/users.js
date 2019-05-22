const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const checkJwt = require('../middleware/checkJwt');
const checkRights = require('../middleware/checkRights');

router.get('/csv', checkJwt, checkRights.isSuperAdmin, usersController.getUsersCsv)
router.get('/', checkJwt, checkRights.isSuperAdmin, usersController.getAllUsers)

module.exports = router