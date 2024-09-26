const goalService = require('../services/goalService');
const Response = require('../helpers/response');
const messages = require('../constants/constMessage');

const createGoal = async (req, res) => {
    try {
        const result = await goalService.createGoal({ ...req.body, userId: req.user.id });
        return Response.successResponse(req, res, result, messages.goalCreated, 201);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

const getGoalsByUserId = async (req, res) => {
    try {
        const result = await goalService.getGoalsByUserId(req.user.id);
        return Response.successResponse(req, res, result, messages.goalsFetched, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

const updateGoal = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await goalService.updateGoal(id, req.body);
        return Response.successResponse(req, res, result, messages.goalUpdated, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

const deleteGoal = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await goalService.deleteGoal(id);
        return Response.successResponse(req, res, result, messages.goalDeleted, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

module.exports = {
    createGoal,
    getGoalsByUserId,
    updateGoal,
    deleteGoal
};
