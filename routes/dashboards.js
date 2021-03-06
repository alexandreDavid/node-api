const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const checkJwt = require('../middleware/checkJwt');

router.get('/shared', checkJwt, dashboardController.getSharedDashboards)
router.get('/', checkJwt, dashboardController.getDashboards)
router.get('/:id', checkJwt, dashboardController.getDashboardById)
router.post('/', checkJwt, dashboardController.addDashboard)
router.put('/:id', checkJwt, dashboardController.updateDashboard)
router.delete('/:id', checkJwt, dashboardController.deleteDashboard)
router.patch('/:id', checkJwt, dashboardController.patchDashboard)

module.exports = router
