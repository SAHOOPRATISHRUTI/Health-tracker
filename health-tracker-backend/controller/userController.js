const userService = require('../services/userService');
const Response = require('../helpers/response');
const messages = require('../constants/constMessage');

const registerUser = async (req, res) => {
    try {
        const result = await userService.registerUser(req.body);
        if (result.isDuplicateEmail) {
            return Response.failResponse(req, res, null, messages.duplicateEmail, 200);
        }
        return Response.successResponse(req, res, result, messages.createdSuccess, 201);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

const loginUser = async (req,res)=>{
    try{
        const result = await userService.loginUser(req.body)
        if (result.error) {
            return Response.failResponse(req, res, null, result.error, 401);
        }
        return Response.successResponse(req, res, result, messages.loginSuccess, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
    }
   


const requestOTP = async (req, res) => {
    try {
        await userService.requestOTP(req.body.email);
        return Response.successResponse(req, res, null, messages.otpSent, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

const verifyOTP = async (req, res) => {
    try {
        const result = await userService.verifyOTP(req.body);
        return Response.successResponse(req, res, result, messages.otpVerified, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};








module.exports={
    registerUser,
    loginUser,
    requestOTP,
    verifyOTP
}