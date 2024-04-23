const mongoose =require("mongoose");
const { Schema }=require("mongoose");


const UserSchema = new Schema({
  name: String,
  password: String,
  email: String,
  lastName: {
    type: String,
    default: 'lastName'
  }
  , location: {
    type: String,
    default: "location"
  }
  ,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});
const Users = mongoose.model("users", UserSchema);

module.exports=Users;





