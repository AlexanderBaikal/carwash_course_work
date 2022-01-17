import { AxiosResponse } from "axios";
import $api from "../http";

export default class ReviewService {
  static async getOrgReviews(orgId) {
    return $api.get(`/organization/${orgId}/reviews`);
  }
  static async addReview(userId, orgId, value, description) {
    return $api.post(`/organization/${orgId}/review`, {
      userId,
      value,
      description,
    });
  }

  static async deleteReview(userId, orgId, reviewId) {
    return $api.delete(
      `/user/${userId}/organization/${orgId}/reviews/${reviewId}`
    );
  }
}
