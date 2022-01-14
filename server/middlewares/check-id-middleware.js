const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (getId = (req) => req.params.id) {
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
      if (userData.id != getId(req)) {
        // not !==
        return res.status(403).json({ message: "Нет доступа" });
      }
      req.user = userData;
      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  };
};

// todo auth-middleware дублируется код
