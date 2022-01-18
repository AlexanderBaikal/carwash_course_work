const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const orgService = require("../service/org-service");
const reservService = require("../service/reserv-service");

class ReservationController {
  async getUserReservations(req, res, next) {
    try {
      const userId = req.params.userId;
      const reservations = await reservService.getUserReservations(userId);
      return res.json(reservations);
    } catch (e) {
      next(e);
    }
  }

  async addReservation(req, res, next) {
    try {
      const orgId = req.params.orgId;
      const { userId, carId, services, date } = req.body;
      const result = await reservService.addReservation(
        userId,
        orgId,
        services,
        date,
        carId
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
  async updateReservation(req, res, next) {
    try {
      const orgId = req.params.orgId;
      const reservId = req.params.reservId;
      const { userId, carId, services, date } = req.body;
      const result = await reservService.updateReservation(
        reservId,
        userId,
        orgId,
        services,
        date,
        carId
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
  async deleteReservation(req, res, next) {
    try {
      const userId = req.params.userId;
      const reservId = req.params.reservId;
      const orgId = req.params.orgId;
      const result = await reservService.deleteReservation(
        reservId,
        userId,
        orgId
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
  async getUserHistory(req, res, next) {
    try {
      const userId = req.params.userId;
      const reservations = await reservService.getUserHistory(userId);
      return res.json(reservations);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReservationController();
