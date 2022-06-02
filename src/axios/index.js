import axios from "axios";

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
    if (err.response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      throw new Error("Blocked");
    } else {
      throw err;
    }
  }
);

export default api;
