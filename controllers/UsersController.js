const Users = require("../modals/UserModel");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const { BadRequestError } = require("../errors/CustomError");



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


const UpdateUser = async (request, response) => {
  const { id } = request.params;
  const { name, password, lastName, email, location } = request.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(StatusCodes.NOT_FOUND).json({ msg: "user not found with the searched id" });
  }
  try {
    const updatepost = { name, password, lastName, email, location, _id: id };
    const user = await Users.findByIdAndUpdate(id, updatepost, { new: true });
    if (!user) {
      throw new BadRequestError("user is not defined");
    }
    response.status(StatusCodes.OK).json({ user });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "not found" });
  }
}


module.exports = { getCurrentUser, getAllUsers, UpdateUser };