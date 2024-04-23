const day = require("dayjs");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Jobs = require("../modals/JobModel");
const Users = require("../modals/UserModel");
const { BadRequestError } = require("../errors/CustomError");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find();
    console.log(jobs);
    res.status(StatusCodes.OK).json({ jobs });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const ShowStats = async (req, res) => {
  try {
    const usersCount = await Users.countDocuments();
    const jobsCount = await Jobs.countDocuments();
    res.status(StatusCodes.OK).json({ usersCount, jobsCount });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findById(id);
    if (!job) {
      throw new BadRequestError('Job not found');
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const CreateJob = async (req, res) => {
  const { company, position, jobLocation, jobStatus, jobType } = req.body;
  try {
    const job = await Jobs.create({
      company,
      position,
      jobLocation,
      jobStatus,
      jobType,
    });
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const UpdateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position, jobLocation, jobStatus, jobType } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "user not found with the id" });
  try {
    const updatepost = { company, position, jobStatus, jobType, jobLocation, _id: id };
    const job = await Jobs.findByIdAndUpdate(id, updatepost, { new: true });
    if (!job) {
      throw new BadRequestError('Job not found');
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const DeleteJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(StatusCodes.NOT_FOUND).json({ msg: "data your deleting is not available" });
  
     await Jobs.findByIdAndDelete(id);

     res.status(StatusCodes.OK).json({msg:"Job is been deleleted"});

};

module.exports = { getAllJobs, ShowStats, getJob, CreateJob, UpdateJob, DeleteJob };
