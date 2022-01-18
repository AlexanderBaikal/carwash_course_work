import $api from "../http";

export default class AdminService {
  static async getAllUsers() {
    return $api.get(`/users`);
  }
  static async updateUserRole(userId, role) {
    return $api.patch(`/users/${userId}/role`, { role });
  }
}
