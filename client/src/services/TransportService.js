import { AxiosResponse } from "axios";
import $api from "../http";

export default class TransportService {
  static async addTransport(data) {
    return $api.post(`/user/${data.userId}/transport`, {
      brand: data.brand,
      model: data.model,
      regNumber: data.regNumber,
      transportType: data.transportType,
    });
  }

  static async updateTransport(data) {
    return $api.patch(`/user/${data.userId}/transport/${data.carId}`, {
      brand: data.brand,
      model: data.model,
      regNumber: data.regNumber,
      transportType: data.transportType,
    });
  }

  static async deleteTransport(data) {
    return $api.delete(`/user/${data.userId}/transport/${data.carId}`);
  }
}
