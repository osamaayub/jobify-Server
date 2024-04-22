const express=require( "express");
const jobsRouter=express.Router();
const { getAllJobs,CreateJob,getJob, UpdateJob, DeleteJob, ShowStats }=require( "../controllers/JobsController");

const{ ValidateIdParam,ValidateInput} =require( "../middlewares/ValidationMiddleWare");
const { CheckForTester }= require("../middlewares/authMiddleware");
//get all jobs
jobsRouter.get("/",getAllJobs);

//get all jobs stats
jobsRouter.get("/stats",ShowStats);


//get a single job 

jobsRouter.get("/:id",ValidateIdParam, getJob);

//create a new Job

jobsRouter.post("/",CreateJob,ValidateInput,CheckForTester);


//update a job 
jobsRouter.patch("/:id",UpdateJob,ValidateInput,ValidateIdParam,CheckForTester);


//delete a job 
jobsRouter.delete("/:id",DeleteJob,ValidateIdParam,CheckForTester);


module.exports=jobsRouter;