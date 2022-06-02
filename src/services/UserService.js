import api from "../axios";

export default class UserService {
  static getUsers = async () => {
    return api.get("/users");
  };

  static blockUsers = async (ids) => {
    return api.patch("/users/block", { ids });
  };

  static unblockUsers = async (ids) => {
    return api.patch("/users/unblock", { ids });
  };

  static removeUsers = async (ids) => {
    return api.delete("/users/remove", { data: { ids } });
  };
}
