const {StatesCodes}=require( "http-status-codes");


const errorMiddleWareHandler=(err,req,res,next)=>{
  const statusCode=err.statusCode||StatesCodes.INTERNAL_SERVER_ERROR;
  const msg=err.message || "Something went wrong";
  res.status(statusCode).json({msg});
  next();

}

module.exports=errorMiddleWareHandler;