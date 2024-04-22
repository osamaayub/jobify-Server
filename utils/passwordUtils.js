
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const hashPassword = async (password) => {
  const salts = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salts);
  return hashPassword;
}

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
}
module.exports = { comparePassword, hashPassword };