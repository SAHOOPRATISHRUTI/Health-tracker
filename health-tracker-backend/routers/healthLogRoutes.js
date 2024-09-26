const express = require('express');
const healthLogController = require('../controller/healthLogController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

// Route to log a health metric (requires authentication)
router.post('/logHealthMetric', authMiddleware.verifyUserToken, healthLogController.logHealthMetric);

// Route to get all health logs
router.get('/total-health-logs', healthLogController.getHealthLogs);

// Route to get a health log by ID (requires authentication)
router.get('/total-health-logs/:id', authMiddleware.verifyUserToken, healthLogController.getHealthLogById);

// Route to update a health log by ID (requires authentication)
router.put('/total-health-logs/:id', authMiddleware.verifyUserToken, healthLogController.updateHealthLog);

// Route to delete a health log by ID (requires authentication)
router.delete('/total-health-logs/:id', authMiddleware.verifyUserToken, healthLogController.deleteHealthLog);

module.exports = router;
