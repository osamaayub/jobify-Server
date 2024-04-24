const { Unauthenticated, UnAuthorized, BadRequestError } = require("../errors/CustomError");
const VerifyToken  = require("../utils/tokenUtils");

const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new Unauthenticated("Token is invalid");
  }
  try {
    const { userId, testUser, role } = VerifyToken(token);
    if (!userId || !role) {
      throw new Unauthenticated("User data not found in token");
    }
    // Set testUser to false if not present in token
    const isTestUser = testUser || false;
    req.user = { userId, role, isTestUser };
    next();
  } catch (error) {
    throw new Unauthenticated("User is not authenticated");
  }
};

const authorizedPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthorized("Unauthorized to access this route");
    }
    next();
  };
};

const CheckForTester = (req, res, next) => {
  if (req.user && req.user.isTestUser) {
    throw new BadRequestError("Demo Read Only");
  }
  next();
};

module.exports = { authorizedPermission, CheckForTester, authenticateUser };
