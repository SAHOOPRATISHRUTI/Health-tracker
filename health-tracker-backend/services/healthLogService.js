const HealthLog = require('../models/healthLogModel')
const messages=require('../constants/constMessage')


const logHealthMetric = async (data, userId) => {
    try {
        // Ensure userId is passed
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
        return await HealthLog.find().sort({ createdAt: -1 }); // Return all health logs
    } catch (error) {
        console.error('Error fetching health logs', error);
        throw new Error(messages.fetchHealthLogs);
    }
};

const getHealthLogsById = async (userId) => {
    try {
        const healthLog = await HealthLog.findById(userId); // Fetch a health log by ID
        if (!healthLog) {
            throw new Error(messages.healthLogNotFound);
        }
        return healthLog; // Return the specific health log
    } catch (error) {
        console.error('Error Fetching health log By ID', error);
        throw new Error(messages.fetchHealthLogsId);
    }
};

const updateHealthLog = async (userId, data) => {
    try {
        const updatedHealthLog = await HealthLog.findByIdAndUpdate(userId, data, { new: true });
        if (!updatedHealthLog) {
            throw new Error(messages.healthLogNotFound);
        }
        return updatedHealthLog;
    } catch (error) {
        console.error('Error updating health log', error);
        throw new Error(messages.updateHealthLog);
    }
};

const deleteHealthLog = async (userId) => {
    try {
        const deletedHealthLog = await HealthLog.findByIdAndDelete(userId);
        if (!deletedHealthLog) {
            throw new Error(messages.healthLogNotFound);
        }
        return deletedHealthLog;
    } catch (error) {
        console.error('Error deleting health log', error);
        throw new Error(messages.deleteHealthLog);
    }
}



module.exports = {
    logHealthMetric,
    getHealthLogs,
    getHealthLogsById,
    updateHealthLog,
    deleteHealthLog,
};
