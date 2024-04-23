const jobsRouter = require("express").Router();
const { getAllJobs, CreateJob, getJob, UpdateJob, DeleteJob, ShowStats } = require("../controllers/JobsController");
const { ValidateIdParam, ValidateInput } = require("../middlewares/ValidationMiddleWare");
const { CheckForTester } = require("../middlewares/authMiddleware");

// Define routes using HTTP verb methods on the router object

// Get all jobs
jobsRouter.get("/", getAllJobs);

// Get all jobs stats
jobsRouter.get("/stats", ShowStats);

// Get a single job
jobsRouter.get("/:id", ValidateIdParam, getJob);

// Create a new Job
jobsRouter.post("/", ValidateInput, CheckForTester, CreateJob);

// Update a job
jobsRouter.put("/:id", ValidateInput, ValidateIdParam, CheckForTester, UpdateJob);

// Delete a job
jobsRouter.delete("/:id", ValidateIdParam, CheckForTester, DeleteJob);

module.exports = jobsRouter;
