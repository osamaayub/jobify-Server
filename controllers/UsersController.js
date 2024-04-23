const Users =require("../modals/UserModel");
const Jobs=require( "../modals/JobModel");
const cloudinary =require("cloudinary");
const { StatusCodes } =require("http-status-codes");
const fileuploadImage =require("../middlewares/formatImage");
const { ObjectId } = require("mongodb");



const getCurrentUser=async(request,response)=>{
  const user= await Users.findOne({id:ObjectId});
  const UserPassword=user.toJSON();
  response.status(StatusCodes.OK).json({user:UserPassword});

}
const getAllUsers=async(request,response)=>{
  const users=await Users.countDocuments();
  const jobs=await Jobs.countDocuments();
  response.status(StatusCodes.OK).json({users,jobs});
}


const UpdateUser=async(request,response)=>{
  const user={...request.body};
  console.log(user);
  delete user.password;
  delete user.role;
  if(request.file){
    const file=fileuploadImage(request.file);
    const response= await  cloudinary.v2.uploader.upload(file);
    user.avatar=response.secure_url;
    user.avatarPublicId=response.public_id;
  }
  const UpdateUser= await Users.findByIdAndUpdate(request.user.userId,user);
  if(request.file &&UpdateUser.avatarPublicId){
    await  cloudinary.v2.uploader.destroy(UpdateUser.avatarPublicId);

  }
  return response.status(StatusCodes.OK).json({msg:'updated user'});
}


module.exports={getCurrentUser,getAllUsers,UpdateUser};