const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Create a new user (registration)
router.post('/register', userController.registerUser);
router.post('/login',userController.loginUser)
router.post('/request-otp', userController.requestOTP);
router.post('/verify-otp', userController.verifyOTP);
module.exports = router;
