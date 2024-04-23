const Users = require("../modals/UserModel");
const Jobs = require("../modals/JobModel");
const cloudinary = require("cloudinary");
const { StatusCodes } = require("http-status-codes");
const fileuploadImage = require("../middlewares/formatImage");
const {BadRequestError}=require("../errors/CustomError");



const getCurrentUser = async (request, response) => {
  try{
  const findUser=await Users.findOne({email:request.body.email});
 if (!findUser) return response.status(StatusCodes.NOT_FOUND).json({ msg: "user is not found" });
  response.status(StatusCodes.OK).json({findUser});
  }
  catch(err){
    throw new BadRequestError("not found");
  }
}

const getAllUsers = async (request, response) => {
  try{
    const findAllUsers=await Users.find();
    console.log(findAllUsers);
    if(!findAllUsers)response.status(StatusCodes.NOT_FOUND).json({msg:"users not found"});
    return response.status(StatusCodes.OK).json({findAllUsers});
  }
  catch(err){
    throw new BadRequestError("Try again");
  }
}


const UpdateUser = async (request, response) => {
  const user = { ...request.body };
  console.log(user);
  delete user.password;
  delete user.role;
  if (request.file) {
    const file = fileuploadImage(request.file);
    const response = await cloudinary.v2.uploader.upload(file);
    user.avatar = response.secure_url;
    user.avatarPublicId = response.public_id;
  }
  const UpdateUser = await Users.findByIdAndUpdate(request.user.userId, user);
  if (request.file && UpdateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(UpdateUser.avatarPublicId);

  }
  return response.status(StatusCodes.OK).json({ msg: 'updated user' });
}


module.exports = { getCurrentUser, getAllUsers, UpdateUser };