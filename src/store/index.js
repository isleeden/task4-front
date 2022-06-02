import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { API_URL } from "../axios";

export default class Store {
  user = {};
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(b) {
    this.isAuth = b;
  }

  setUser(user) {
    this.user = user;
  }

  async login(login, password) {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
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

  async registration(login, password) {
    try {
      const response = await AuthService.registration(login, password);
      localStorage.setItem("token", response.data.accessToken);
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
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setIsAuth(false);
      this.setUser({});
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
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // console.log(e);
    }
  }
}
