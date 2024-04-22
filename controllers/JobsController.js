const day = require("dayjs");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Jobs = require("../modals/JobModel");

const getAllJobs = async (req, res) => {
  const { search, jobstatus, jobtype } = req.query;

  const queryObject = {
    createdBy: req.user.userId
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ];
  }

  if (jobstatus && jobstatus !== 'all') {
    queryObject.jobstatus = jobstatus;
  }

  if (jobtype && jobtype !== 'all') {
    queryObject.jobtype = jobtype;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    'a-z': "position",
    'z-a': "-position" // Corrected sort option
  };

  const sortkey = sortOptions[req.query.sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Jobs.find(queryObject)
    .sort(sortkey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Jobs.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ totalJobs, numOfPages, jobs });
};

const CreateJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.OK).json({ job });
};

const getJob = async (req, res) => {
  const job = await Jobs.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

const UpdateJob = async (req, res) => {
  const updatedjob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.status(StatusCodes.OK).json({ updatedjob });
};

const DeleteJob = async (req, res) => {
  const deletejob = await Jobs.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ deletejob });
};

const ShowStats = async (req, res) => {
  let stats = await Jobs.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) }
    },
    {
      $group: { _id: '$jobStatus', count: { $sum: 1 } }
    }
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id, count } = curr;
    acc[_id] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0
  };

  let MontlyApplications = await Jobs.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 } // Fixed the sort syntax
    },
    {
      $limit: 6
    }
  ]);

  MontlyApplications = MontlyApplications.map(item => {
    const { _id: { year, month }, count } = item;
    const date = day()
      .month(month - 1)
      .year(year)
      .format('MM YY');
    return { date, count };
  }).reverse();

  res.status(StatusCodes.OK).json({ defaultStats, MontlyApplications });
};

module.exports = {
  ShowStats,
  UpdateJob,
  getAllJobs,
  getJob,
  CreateJob,
  DeleteJob
};