import axios from "axios";

export const API_URL = "http://192.168.1.52:5000/api";
export const BASE_URL = "http://192.168.1.52:5000";

const $api = axios.create({ baseURL: API_URL, withCredentials: true });

$api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
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
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return $api.request(originalRequest);
      } catch (e) {
        console.log(
          "Пользователь не авторизован",
          e.response?.data || e.message
        );
      }
    }
    console.log("error", error);
    throw error;
  }
);

export default $api;
