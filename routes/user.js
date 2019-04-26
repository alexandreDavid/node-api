const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/userController')

router.post('/login', authenticationController.login)
router.post('/change_password', authenticationController.changePassword)
router.post('/signup', authenticationController.signup)

module.exports = router
