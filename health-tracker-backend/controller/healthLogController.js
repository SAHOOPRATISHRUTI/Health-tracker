const healthLogService = require('../services/healthLogService');
const Response = require('../helpers/response');
const messages = require('../constants/constMessage');
const mongoose = require('mongoose');

// Log a new health metric
const logHealthMetric = async (req, res) => {
    try {
        const result = await healthLogService.logHealthMetric(req.body, req.user.id);
        return Response.successResponse(req, res, result, messages.metricLogged, 201);
    } catch (error) {
        return Response.errorResponse(req, res, error.message);
    }
};

// Get all health logs
const getHealthLogs = async (req, res) => {
    try {
        const healthLogs = await healthLogService.getHealthLogs();
        return Response.successResponse(req, res, healthLogs, messages.healthLogsFetched, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error.message);
    }
};

// Get a health log by ID
const getHealthLogById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Response.errorResponse(req, res, 'Invalid health log ID', 400);
    }
    try {
        const healthLog = await healthLogService.getHealthLogsById(id);
        return Response.successResponse(req, res, healthLog, messages.healthLogFetched, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error.message);
    }
};

// Update a health log by ID
const updateHealthLog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Response.errorResponse(req, res, 'Invalid health log ID', 400);
    }
    const data = req.body;
    try {
        const updatedHealthLog = await healthLogService.updateHealthLog(id, data);
        return Response.successResponse(req, res, updatedHealthLog, messages.healthLogUpdated, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error.message);
    }
};

// Delete a health log by ID
const deleteHealthLog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Response.errorResponse(req, res, 'Invalid health log ID', 400);
    }
    try {
        const deletedHealthLog = await healthLogService.deleteHealthLog(id);
        return Response.successResponse(req, res, deletedHealthLog, messages.healthLogDeleted, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error.message);
    }
};

module.exports = {
    logHealthMetric,
    getHealthLogs,
    getHealthLogById,
    updateHealthLog,
    deleteHealthLog,
};
