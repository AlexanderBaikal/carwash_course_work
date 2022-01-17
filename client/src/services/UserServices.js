import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../models/IUser";

export default class UserService {
  static async fetchUsers() {
    return $api.get("/users");
  }
  static async updateUserInfo(
    id,
    accessToken,
    firstName,
    lastName,
    middleName,
    gender
  ) {
    return $api.patch(`/user/${id}`, {
      accessToken,
      firstName,
      lastName,
      middleName,
      gender,
    });
  }
  static async getNotifications(userId) {
    return $api.get(`/user/${userId}/notifications`);
  }
}
