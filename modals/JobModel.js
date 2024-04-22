const  mongoose=require("mongoose");
const{ Schema } =require("mongoose");
const{ JOB_STATUS, JOB_TYPE } = require("../utils/Constants");


const JobSchema = new Schema({
  company: String,
  position: String,
  JobsLocation: {
    type: String,
    default: "location"
  },
  jobStatus: {
    type: String,
    enum: Object.values(JOB_STATUS),
    default: JOB_STATUS.PENDING
  },
  jobType: {
    type: String,
    enum: Object.values(JOB_TYPE),
    default: JOB_TYPE.FULL_TIME
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
},
  {
    timestamps: true
  });



 const Jobs = mongoose.model("Jobs", JobSchema);

 module.exports=Jobs;

