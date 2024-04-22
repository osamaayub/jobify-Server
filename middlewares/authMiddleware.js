const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthorized, Unauthenticated } = require("../errors/CustomError");
const { decodeJWT } = require("../utils/tokenUtils");





const authorizedPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthorized("UnAuthorize to acess this route");
    }
    next();
  }

}

const CheckForTester = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo Read Only");
  next();
}

module.exports = { authorizedPermission, CheckForTester};
