const express = require('express')
const router = express.Router()
const settingController = require('../controllers/settingController')
const checkJwt = require('../middleware/checkJwt');
const defineUser = require('../middleware/defineUser');

router.get('/', settingController.getSettings)
router.get('/active', checkJwt, defineUser, settingController.getSettingsForUser)
router.put('/active/:id', checkJwt, defineUser, settingController.updateSetting)

module.exports = router
