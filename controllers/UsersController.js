const Users = require("../modals/UserModel");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const { BadRequestError } = require("../errors/CustomError");


//get a single user
const getCurrentUser = async (request, response) => {
  try {
    const findUser = await Users.findOne({ email: request.body.email });
    if (!findUser) return response.status(StatusCodes.NOT_FOUND).json({ msg: "user is not found" });
    response.status(StatusCodes.OK).json({ findUser });
  }
  catch (err) {
    throw new BadRequestError("not found");
  }
}
//get all users
const getAllUsers = async (request, response) => {
  try {
    const findUsers = await Users.find();
    if (!findUsers) return response.status(StatusCodes.NOT_FOUND).json({ msg: "user is not found" });
    response.status(StatusCodes.OK).json({ findUsers });
  }
  catch (err) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "searched user is not found" });
  }

}

  //update users  using put
const UpdateUser = async (request, response) => {
  const { id } = request.params;
  const { name, lastName, email, password, role } = request.body;

  if (!mongoose.Types.ObjectId.isValid(id)) 
  return response.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Id" });
  try {
    const updatepost = {name, lastName, email, password, role, _id: id };
    const user = await Users.findByIdAndUpdate(id, updatepost, { new: true });

    response.status(StatusCodes.OK).json({ user });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}



module.exports = { getCurrentUser, getAllUsers, UpdateUser };