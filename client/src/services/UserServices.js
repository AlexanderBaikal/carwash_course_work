import $api from "../http";

export default class UserService {
  static async fetchUsers() {
    return $api.get("/users");
  }
  static async updateUserInfo(id, firstName, lastName, middleName, gender) {
    return $api.patch(`/user/${id}`, {
      firstName,
      lastName,
      middleName,
      gender,
    });
  }
  static async getUserInfo(userId) {
    return $api.get(`/users/${userId}`);
  }

  static async getNotifications(userId) {
    return $api.get(`/user/${userId}/notifications`);
  }
}
