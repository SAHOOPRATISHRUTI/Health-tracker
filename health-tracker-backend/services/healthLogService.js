const mongoose = require('mongoose');
const HealthLog = require('../models/healthLogModel');
const messages = require('../constants/constMessage');

const logHealthMetric = async (data, userId) => {
    try {
        const healthLog = new HealthLog({ ...data, userId });
        await healthLog.save();
        return healthLog;
    } catch (error) {
        console.error('Error logging health metric', error);
        throw new Error(messages.logHealthMetric);
    }
};

const getHealthLogs = async () => {
    try {
        return await HealthLog.find().sort({ createdAt: -1 });
    } catch (error) {
        console.error('Error fetching health logs', error);
        throw new Error(messages.fetchHealthLogs);
    }
};

const getHealthLogsById = async (logId) => {
    try {
        const healthLog = await HealthLog.findById(logId);
        if (!healthLog) {
            throw new Error(messages.healthLogNotFound);
        }
        return healthLog;
    } catch (error) {
        console.error('Error fetching health log by ID', error);
        throw new Error(messages.fetchHealthLogsId);
    }
};

const updateHealthLog = async (logId, data) => {
    try {
        const updatedHealthLog = await HealthLog.findByIdAndUpdate(logId, data, { new: true });
        if (!updatedHealthLog) {
            throw new Error(messages.healthLogNotFound);
        }
        return updatedHealthLog;
    } catch (error) {
        console.error('Error updating health log', error);
        throw new Error(messages.updateHealthLog);
    }
};

const deleteHealthLog = async (logId) => {
    try {
        const deletedHealthLog = await HealthLog.findByIdAndDelete(logId);
        if (!deletedHealthLog) {
            throw new Error(messages.healthLogNotFound);
        }
        return deletedHealthLog;
    } catch (error) {
        console.error('Error deleting health log', error);
        throw new Error(messages.deleteHealthLog);
    }
};

module.exports = {
    logHealthMetric,
    getHealthLogs,
    getHealthLogsById,
    updateHealthLog,
    deleteHealthLog,
};
