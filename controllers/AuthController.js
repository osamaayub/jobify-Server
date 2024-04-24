const { StatusCodes } = require("http-status-codes");
const Users = require("../modals/UserModel");
const  {Unauthenticated, UnAuthorized}  = require("../errors/CustomError");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { CreateJWT}  = require("../utils/tokenUtils");



//login
const Login = async (req, res) => {
  const{email,password}=req.body;
  const user = await Users.findOne({ email});
  if(!user) return res.status(StatusCodes.NOT_FOUND).json({msg:"user not found"});
  const IsValidPassword = user && await comparePassword(password,user.password);
  if (!IsValidPassword) throw new UnAuthorized("password is not valid");
  
  const token=CreateJWT({email,password});
  res.cookie("token",token,{
    withCredentials:true,
    httpOnly:true

  })
  res.status(StatusCodes.OK).json({msg:"user is logged in",token:token});

}


//Register 

const Register = async (req, res) => {

  const isFirstAccount = (await Users.countDocuments({}) === 0);
  req.body.role = isFirstAccount ? "admin" : "user";
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  console.log("show request body: ",req.body)
  const isUserExist = await Users.findOne({email : req.body.email})
  if (isUserExist){
    res.status(StatusCodes.CONFLICT).json({ msg: "user already exist with this email"});
  }
  else{
    const user = await Users.create(req.body);
    const token = user ? CreateJWT({ email: user.email }) : null;
    res.status(StatusCodes.CREATED).json({ msg: "user created", user, token });
  }

}


//logout 

const logoutController = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  });
  res.status(StatusCodes.OK).json({ msg: "user has logged out" });
}
module.exports = { logoutController, Register, Login };
