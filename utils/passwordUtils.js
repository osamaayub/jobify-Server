
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const hashPassword = async (password) => {
  const salts = await bcrypt.genSalt(saltRounds);
  return  await bcrypt.hash(password, salts);
}

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
}
module.exports = { comparePassword, hashPassword };