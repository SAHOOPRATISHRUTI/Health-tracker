const healthLogService =  require('../services/healthLogService')
const Response = require('../helpers/response')
const messages = require('../constants/constMessage')


const logHealthMetric = async(req,res)=>{
    try{
        const result = await healthLogService.logHealthMetric(req.body,req.user.id);
        return Response.successResponse(req,res,result,messages.metricLogged,201)
    }
    catch(error){
        return Response.errorResponse(req,res,error)
    }
}

const getHealthLogs = async (req, res) => {
    try {
        const healthLogs = await healthLogService.getHealthLogs(); 
        return Response.successResponse(req, res, healthLogs, messages.healthLogsFetched, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

const getHealthLogById = async (req, res) => {
    const {_id} = req.params; // Extracting ID from URL params
    try {
        const healthLog = await healthLogService.getHealthLogsById(_id); // Fetch health log by ID
        return Response.successResponse(req, res, healthLog, messages.healthLogFetched, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

const updateHealthLog = async (req, res) => {
    const { _id } = req.params;
    const data = req.body;
    try {
        const updatedHealthLog = await healthLogService.updateHealthLog(_id, data);
        return Response.successResponse(req, res, updatedHealthLog, messages.healthLogUpdated, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

const deleteHealthLog = async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedHealthLog = await healthLogService.deleteHealthLog(_id);
        return Response.successResponse(req, res, deletedHealthLog, messages.healthLogDeleted, 200);
    } catch (error) {
        return Response.errorResponse(req, res, error);
    }
};

module.exports={
    logHealthMetric,
    getHealthLogs,
    getHealthLogById,
    updateHealthLog,
    deleteHealthLog,
    
    

}