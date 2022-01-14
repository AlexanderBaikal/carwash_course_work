import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { getData, storeData } from "../utils/asyncStorage";

export const API_URL = "http://192.168.1.52:5000/api";
export const BASE_URL = "http://192.168.1.52:5000";

const $api = axios.create({ baseURL: API_URL });

$api.interceptors.request.use(async (config) => {
  const userData = await getData("userData");
  if (userData) {
    const { accessToken } = JSON.parse(userData);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { refreshToken } = JSON.parse(await getData("userData"));
        const response =
          (await axios.post) <
          AuthResponse >
          (`${API_URL}/refresh`,
          {
            refreshToken,
          });
        await storeData("userData", JSON.stringify(response.data));
        return $api.request(originalRequest);
      } catch (e) {
        console.log(
          "! Пользователь не авторизован",
          e.response?.data || e.message
        );
      }
    }
    console.log("error", error);
    throw error;
  }
);

export default $api;
