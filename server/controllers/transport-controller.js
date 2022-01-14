const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const transportService = require("../service/transport-service");
const userService = require("../service/user-service");

class TransportController {
  async addTransport(req, res, next) {
    try {
      const errors = validationResult(req);
      console.log(errors.array());
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const userId = req.params.id;
      const { brand, model, regNumber, transportType } = req.body;
      const transportData = await transportService.addTransport(
        userId,
        brand,
        model,
        regNumber,
        transportType
      );
      return res.json(transportData);
    } catch (e) {
      next(e);
    }
  }

  async updateTransport(req, res, next) {
    try {
      const errors = validationResult(req);
      console.log(errors.array());
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const userId = req.params.id;
      const carId = req.params.carId;
      const { brand, model, transportType, regNumber } = req.body;

      const transportData = await transportService.updateTransport(
        userId,
        brand,
        model,
        regNumber,
        transportType,
        carId
      );
      return res.json(transportData);
    } catch (e) {
      next(e);
    }
  }

  async deleteTransport(req, res, next) {
    try {
      const errors = validationResult(req);
      console.log(errors.array());
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const userId = req.params.id;
      const carId = req.params.carId;

      const transportData = await transportService.deleteTransport(
        userId,
        carId
      );
      return res.json(transportData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TransportController();
