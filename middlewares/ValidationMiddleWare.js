const { body, param ,validationResult} = require("express-validator");
const mongoose = require("mongoose");
const { JOB_STATUS, JOB_TYPE } = require("../utils/Constants");
const Users = require("../modals/UserModel");
const Jobs = require("../modals/JobModel");

const withValidateErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
};

const ValidateInput = withValidateErrors([
  body('company').notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
  body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid Job Status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type")
]);

const ValidateIdParam = withValidateErrors([
  param('id').custom(async (value, { req }) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid MongoDb Id');
    }
    const job = await Jobs.findById(value);
    if (!job) {
      throw new Error("No Job found");
    }
  
    const isAdmin=Users.role=== "Admin";
    const isOwner = Users._id === job.createdBy;
    if (!isAdmin && !isOwner) {
      throw new Error("User is not Authorized");
    }
  })
]);

const ValidateRegisterInput = withValidateErrors([
  body('name').notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").custom(async (value) => {
    const user = await Users.findOne({ email: value });
    if (user) {
      throw new Error("User already exists");
    }
  }),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("Location is required"),
  body("lastName").notEmpty().withMessage("Last Name is required")
]);

const ValidateLoginInput = withValidateErrors([
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
]);

const ValidateLogoutInput = withValidateErrors([
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("Password is required").isLength({ max: 8 }).withMessage("Password must be at most 8 characters long")
]);

const ValidateUpdateUserInput = withValidateErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").custom(async (value, { req }) => {
    const user = await Users.findOne({ email: value });
    if (user && user._id.toString() !== req.user.userId) {
      throw new Error("User already exists");
    }
  }),
  body("location").notEmpty().withMessage("Location is required"),
  body("lastName").notEmpty().withMessage("Last Name is required")
]);

module.exports = { ValidateIdParam, ValidateInput, ValidateLogoutInput, ValidateRegisterInput, ValidateUpdateUserInput, ValidateLoginInput };
