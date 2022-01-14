const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      console.log(errors.array());
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.login(phone, hash, otp);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      console.log("req.body", req.body);

      const token = await userService.logout(refreshToken);
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userData = await userService.refresh(refreshToken); // ...tokens, user: userDto
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  async updateUserInfo(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const id = req.params.id;
      const { firstName, lastName, middleName, gender } = req.body;
      const userData = await userService.updateUserInfo(id, {
        firstName,
        lastName,
        middleName,
        gender,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
    } catch (e) {}
  }
}

module.exports = new UserController();
