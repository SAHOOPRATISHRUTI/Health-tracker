const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const healthLogRouter = require('./healthLogRoutes');

router.use('/users', userRouter); // Register user routes
router.use('/health-log', healthLogRouter);
module.exports = router;
