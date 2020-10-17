import axiosClient from "../config/axios";
import { setUser, getUser } from "./userLocalStorage";

export const fetchCurrentUser = async () => {
    try {
      const response = await axiosClient.get("auth/whoami/");
      const userData = response.data.results[0];
      setUser(userData);
      return userData
    } catch (error) {}
  };

export const isLogin = () => {
  if (getUser('usrnm')) {
    fetchCurrentUser();
    return true;
  }
  return false;
};