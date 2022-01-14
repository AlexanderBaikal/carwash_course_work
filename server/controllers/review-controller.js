const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const orgService = require("../service/org-service");
const reservService = require("../service/reserv-service");
const reviewService = require("../service/review-service");
const userService = require("../service/user-service");

class ReviewController {
  async getOrgReviews(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const orgId = parseInt(req.params.orgId);

      const reviews = await reviewService.getOrgReviews(orgId);
      return res.json(reviews);
    } catch (e) {
      next(e);
    }
  }

  async addReview(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const orgId = parseInt(req.params.orgId);
      const { value, description, userId } = req.body;

      const reviews = await reviewService.addReview(
        orgId,
        value,
        description,
        userId
      );
      return res.json(reviews);
    } catch (e) {
      next(e);
    }
  }

  async deleteReview(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const orgId = parseInt(req.params.orgId);
      const reviewId = parseInt(req.params.reviewId);
      const userId = parseInt(req.params.userId);

      const reviews = await reviewService.deleteReview(orgId, reviewId, userId);
      return res.json(reviews);
    } catch (e) {
      next(e);
    }
  }

  async getNotifications(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const userId = parseInt(req.params.userId);

      const notifications = await userService.getNotifications(userId);
      return res.json(notifications);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReviewController();
