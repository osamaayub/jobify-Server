const express = require("express");
const userRouter = express.Router();
const { getCurrentUser, getAllUsers, UpdateUser } = require("../controllers/UsersController");
const upload = require("../middlewares/formatImage");
const { ValidateUpdateUserInput } = require("../middlewares/ValidationMiddleWare");
const { CheckForTester, authorizedPermission } = require("../middlewares/authMiddleware");


//get all users
userRouter.get("/current-user", getCurrentUser);


//get all admin stats

userRouter.get("/admin/app-stats",
  getAllUsers
  , authorizedPermission('admin'));


//update a user
userRouter.patch("/update-user", UpdateUser,
  CheckForTester,
  upload.single('avatar'),
  ValidateUpdateUserInput);




module.exports = userRouter;
