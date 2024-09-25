const express = require('express');
const healthLogController = require('../controller/healthLogController');
// const { authGuard } = require('../middlewares/authGuard'); // Middleware for authentication
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware')
// router.use(authGuard); // Protect all routes under this router

router.post('/logHealthMetric',authMiddleware.verifyUserToken, healthLogController.logHealthMetric);
router.get('/total-health-logs',healthLogController.getHealthLogs);
router.get('/total-health-logs/:id',authMiddleware.verifyUserToken,healthLogController.getHealthLogById);
router.put('/total-health-logs/:id', authMiddleware.verifyUserToken, healthLogController.updateHealthLog);
router.delete('/total-health-logs/:id', authMiddleware.verifyUserToken, healthLogController.deleteHealthLog);



module.exports = router;
