const failResponse = (req,res,data,message,statusCode)=>{
    return res.status(statusCode).send({
        error:false,
        success:false,
        message:message
    });
}
const successResponse =(req,res,data,message,statusCode)=>{
    
    return res.status(statusCode).send({
        error:false,
        success:true,
        message:message,
        data
    });
}
const errorResponse = (req,res,error,errorKey)=>{
    
   const statusCode = errorKey ? errorKey:500;
   return res.status(statusCode).send({
    error:true,
    success:false,
    message:error.message,
    data:null
});
}
module.exports={
    failResponse,
    successResponse,
    errorResponse
}