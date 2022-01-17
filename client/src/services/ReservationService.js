import { AxiosResponse } from "axios";
import $api from "../http";

export default class ReservationService {
  static async getUserReservations(orgId, userId) {
    return $api.get(`/user/${userId}/organization/${orgId}/reservations`);
  }
  static async getDayReservations(orgId, year, month, day) {
    return $api.get(
      `/organization/${orgId}/reservations/${year}/${month}/${day}`
    );
  }
  static async addReservation(data) {
    return $api.post(`/organization/${data.orgId}/reservations`, {
      date: data.date,
      userId: data.userId,
      services: data.services,
      carId: data.carId,
    });
  }
  static async updateReservation(data) {
    return $api.patch(
      `/organization/${data.orgId}/reservations/${data.reservId}`,
      {
        date: data.date,
        userId: data.userId,
        services: data.services,
        carId: data.carId,
      }
    );
  }

  static async deleteReservation(data) {
    return $api.delete(
      `/user/${data.userId}/organization/${data.orgId}/reservations/${data.reservId}`
    );
  }
  static async getUserHistory(userId) {
    return $api.get(`/user/${userId}/reservations/history`);
  }
}
