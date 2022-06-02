import axios from "axios";
import AuthService from "../services/AuthService";

export const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((cfg) => {
  cfg.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return cfg;
});

api.interceptors.response.use(
  (cfg) => {
    return cfg;
  },
  async (err) => {
    try {
      if (err.response.status === 401 && err.config && !err.config.isRetry) {
        err.config.isRetry = true;
        const response = await AuthService.checkAuth();
        localStorage.setItem("token", response.data.accessToken);
        return api.request(err.config);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export default api;
