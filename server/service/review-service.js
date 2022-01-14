const { QueryTypes } = require("sequelize/dist");
const sequelize = require("../db");
const ApiError = require("../exceptions/api-error");
const Review = require("../models/review");
const User = require("../models/user");

class ReviewService {
  async getOrgReviews(orgId) {
    let res = await Review.findAll({
      where: { organizationId: orgId },
      include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
      order: [["updatedAt", "DESC"]],
    });
    return res;
  }
  async addReview(orgId, value, description, userId) {
    await Review.create({
      organizationId: orgId,
      value,
      decription: description,
      userId,
    });
    return await this.getOrgReviews(orgId);
  }
  async deleteReview(orgId, reviewId, userId) {
    await Review.destroy({
      where: {
        organizationId: orgId,
        id: reviewId,
        userId,
      },
    });
    return await this.getOrgReviews(orgId);
  }
}

module.exports = new ReviewService();

// servicename, date, orgname, cardata,
