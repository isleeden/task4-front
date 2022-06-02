import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { API_URL } from "../axios";
import UserService from "../services/UserService";

export default class Store {
  user = {};
  isAuth = false;
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users) {
    this.users = users;
  }

  setIsAuth(b) {
    this.isAuth = b;
    if (!b) {
      this.setUsers([]);
    }
  }

  setUser(user) {
    this.user = user;
  }

  async login(login, password) {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
      // localStorage.setItem("refreshToken", response.data.refreshToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e.response) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    }
  }

  async registration(login, password) {
    try {
      const response = await AuthService.registration(login, password);
      localStorage.setItem("token", response.data.accessToken);
      // localStorage.setItem("refreshToken", response.data.refreshToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e.response.data.message) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    }
  }

  async logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      localStorage.removeItem("token");
      // localStorage.removeItem("refreshToken");
      this.setIsAuth(false);
      this.setUser({});
      await AuthService.logout(refreshToken);
    } catch (e) {
      if (e.response.data.message) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    }
  }

  async checkAuth() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(
        `${API_URL}/refresh`,
        { refreshToken },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers() {
    try {
      const response = await UserService.getUsers();
      this.setUsers(response.data.users);
    } catch (e) {
      console.log(e);
    }
  }
}
