import api from "../axios";

export default class AuthService {
  static login = async (login, password) => {
    return api.post("/login", { login, password });
  };

  static registration = async (login, password) => {
    return api.post("/registration", { login, password });
  };

  static logout = async () => {
    return api.post("/logout");
  };
}
