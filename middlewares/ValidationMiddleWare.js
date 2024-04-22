const mongoose = require("mongoose");
const { JOB_STATUS, JOB_TYPE } = require("../utils/Constants");
const { BadRequestError, ErrorHandle, UnAuthorized } = require("../errors/CustomError");
const { param, body, validationResult } = require("express-validator");
const { Users } = require("../modals/UserModel");
const { Jobs } = require("../modals/JobModel");



const withValidateErrors = (validationValues) => {
  return [
    validationValues, (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("errors.array: ", errors.array())
        const errorMessages = errors.array();
        // const firstMessage = errorMessages[0];
        // console.log(Object.prototype(firstMessage));

        // if (errorMessages[0].startsWith('not job')) {
        //   throw new ErrorHandle(errorMessages);
        // }
        // if (errorMessages[0].startsWith('not authorized')) {
        //   throw new UnAuthorized(errorMessages);

        // }
        // throw new BadRequestError(errorMessages);
      }
      next();
    }
  ]
}
const ValidateInput = withValidateErrors([
  body('company').notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid Job Status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type")
]);


const ValidateIdParam = withValidateErrors([
  param('id').custom(async (value, { req }) => {
    const IsvalidMongoId = mongoose.Types.ObjectId;
    if (!IsvalidMongoId) {
      throw new BadRequestError('Invalid MongoDb Id');
    }
    const job = await Jobs.findById(value);
    if (!job) {
      throw new BadRequestError("No Job found");
    }
    const isAdmin = req.Users.role = "Admin";
    const isOwner = req.Users.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnAuthorized("user is not Authorized");
    }
  })
]);



const ValidateRegisterInput = withValidateErrors([
  body('name').notEmpty().withMessage("name is required"),
  body("email").notEmpty().withMessage("email is required").custom(async (req) => {
    const user = await Users.findOne({ email });
    if (user) {
      throw new BadRequestError("user already exists");
    }
  }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be of 8 characters"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required")
]);
const ValidateLoginInput = withValidateErrors([
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("email is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ max: 8 })
    .withMessage("password must be of 8 characters")
]);

const ValidateLogoutInput = withValidateErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password should be a max of 8 characters")
]);

const ValidateUpdateUserInput = withValidateErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (email, { req }) => {
      const user = Users.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("User already exists");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required")
]);

module.exports = { ValidateIdParam, ValidateInput, ValidateLogoutInput, ValidateRegisterInput, ValidateUpdateUserInput, ValidateLoginInput };