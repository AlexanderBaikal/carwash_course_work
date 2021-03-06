const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method == "OPTIONS") {
      next();
    }

    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return next(ApiError.UnauthorizedError());
      }
      const accessToken = authHeader.split(" ")[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
        return next(ApiError.UnauthorizedError());
      }
      console.log(userData);
      if (userData.role === role) {
        req.user = userData;
        next();
      } else {
        // return res.status(403).json({ message: "У вас недостаточно прав" });
      }
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  };
};

// todo auth-middleware дублируется код
