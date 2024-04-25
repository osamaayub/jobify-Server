const userRouter = require("express").Router();
const { getCurrentUser, getAllUsers, UpdateUser } = require("../controllers/UsersController");
const { ValidateUpdateUserInput, ValidateIdParam } = require("../middlewares/ValidationMiddleWare");
const { CheckForTester, authorizedPermission } = require("../middlewares/authMiddleware");


//get  a  single user
userRouter.get("/current-user", getCurrentUser);


//get all admin stats

userRouter.get("/admin/app-stats",
  //  authorizedPermission('admin'),
  getAllUsers
);


//update a user
userRouter.put("/update-user/:id",
  // CheckForTester,
  ValidateUpdateUserInput,
  UpdateUser
)
userRouter.patch("/update-user/:id",
ValidateUpdateUserInput
)


module.exports = userRouter;
