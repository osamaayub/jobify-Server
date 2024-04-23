const authRouter =require("express").Router();
const  {ValidateRegisterInput,ValidateLoginInput}=require( "../middlewares/ValidationMiddleWare");
const{ Register,logoutController, Login }= require( "../controllers/AuthController");

//Auth Routes
authRouter.post("/register", ValidateRegisterInput, Register);
authRouter.post("/login",ValidateLoginInput,Login);
authRouter.get("/logout",logoutController);

module.exports=authRouter;