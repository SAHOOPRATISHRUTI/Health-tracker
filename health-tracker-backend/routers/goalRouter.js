// goalRouter.js
const express = require('express');
const goalController = require('../controller/goalController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/goals', authMiddleware.verifyUserToken, goalController.createGoal);
router.get('/goals', authMiddleware.verifyUserToken, goalController.getGoalsByUserId);
router.put('/goals/:id', authMiddleware.verifyUserToken, goalController.updateGoal);
router.delete('/goals/:id', authMiddleware.verifyUserToken, goalController.deleteGoal);

module.exports = router;
