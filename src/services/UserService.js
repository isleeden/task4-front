import api from "../axios";

export default class UserService {
  static login = async () => {
    return api.get("/getUsers");
  }
}
