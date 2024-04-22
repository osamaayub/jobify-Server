const jwt = require("jsonwebtoken");


const CreateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}
const  verifyToken= (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}



module.exports = { CreateJWT, verifyToken };