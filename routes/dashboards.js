const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const secured = require('../middleware/secured');

router.get('/', secured(), dashboardController.getDashboards)
router.get('/:id', secured(), dashboardController.getDashboardById)
router.post('/', secured(), dashboardController.addDashboard)
router.put('/:id', secured(), dashboardController.updateDashboard)
router.delete('/:id', secured(), dashboardController.deleteDashboard)

module.exports = router
