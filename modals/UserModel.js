const mongoose =require("mongoose");
const { Schema }=require("mongoose");


const UserSchema = new Schema({
  name: String,
  password: String,
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
  , avatar: {
    type: String,
    avatarPublicId: String
  }
});
UserSchema.methods.toJSON = function () {
  let obj = this.toObject()
  delete obj.password;
  return obj;
}

const Users = mongoose.model("users", UserSchema);

module.exports=Users;





