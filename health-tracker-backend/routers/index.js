const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const healthLogRouter = require('./healthLogRoutes');
const goalRouter = require('./goalRouter')

router.use('/users', userRouter); // Register user routes
router.use('/health-log', healthLogRouter);
router.use('/goalRouter',goalRouter)
module.exports = router;
