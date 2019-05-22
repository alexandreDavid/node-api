const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const checkJwt = require('../middleware/checkJwt');

router.post('/login', userController.login)
router.post('/change_password', userController.changePassword)
router.post('/signup', userController.signup)
router.get('/is_admin', checkJwt, userController.isAdmin)
router.get('/is_super_admin', checkJwt, userController.isSuperAdmin)

module.exports = router
