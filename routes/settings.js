const express = require('express')
const router = express.Router()
const settingController = require('../controllers/settingController')
const checkJwt = require('../middleware/checkJwt');

router.get('/', settingController.getSettings)
router.get('/active', checkJwt, settingController.getSettingsForUser)
router.put('/active/:id', checkJwt, settingController.updateSetting)

module.exports = router
