const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/userController')
const checkJwt = require('../middleware/checkJwt');

router.post('/login', authenticationController.login)
router.post('/change_password', authenticationController.changePassword)
router.post('/signup', authenticationController.signup)
router.get('/is_admin', checkJwt, authenticationController.isAdmin)

module.exports = router
