const userRouter = require("express").Router();
const { getCurrentUser, getAllUsers, UpdateUser } = require("../controllers/UsersController");
const upload = require("../middlewares/formatImage");
const { ValidateUpdateUserInput } = require("../middlewares/ValidationMiddleWare");
const { CheckForTester, authorizedPermission } = require("../middlewares/authMiddleware");


//get  a  single user
userRouter.get("/current-user", getCurrentUser);


//get all admin stats

userRouter.get("/admin/app-stats",
 authorizedPermission('admin'),
 getAllUsers
);


//update a user
userRouter.patch("/update-user", 
  ValidateUpdateUserInput);
  CheckForTester,
    UpdateUser,
  upload.single('avatar')




module.exports = userRouter;
