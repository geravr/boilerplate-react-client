import axiosClient, { setUser, getUser, getAccessToken } from "../config/axios";

const token = getAccessToken();

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