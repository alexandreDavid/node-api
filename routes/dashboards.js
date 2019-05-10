const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const checkJwt = require('../middleware/checkJwt');
const defineUser = require('../middleware/defineUser');

router.get('/', checkJwt, defineUser, dashboardController.getDashboards)
router.get('/:id', checkJwt, defineUser, dashboardController.getDashboardById)
router.post('/', checkJwt, defineUser, dashboardController.addDashboard)
router.put('/:id', checkJwt, defineUser, dashboardController.updateDashboard)
router.delete('/:id', checkJwt, defineUser, dashboardController.deleteDashboard)

module.exports = router
