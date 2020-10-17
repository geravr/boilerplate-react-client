import axios from "axios";
import {
  setToken,
  getAccessToken,
  getRefreshToken,
  deleteToken,
} from "../utils/tokenLocalStorage";
import { deleteUser } from "../utils/userLocalStorage";

/*************** Default Client ***************/
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_HOST,
});
export default axiosClient;

export const initAxiosInterceptors = () => {
  axiosClient.interceptors.request.use(function (config) {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  /*************** Interceptors ***************/
  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const token = getAccessToken();
      const refreshToken = getRefreshToken();

      const originalRequest = error.config;

      if (token || refreshToken) {
        if (
          (error.response.status === 401 &&
            error.response.data.code === "token_not_valid" &&
            error.response.data.messages[0].token_class === "AccessToken") ||
          (error.response.status === 401 &&
            error.response.data.detail ===
              "Authentication credentials were not provided.")
        ) {
          const refreshToken = getRefreshToken();
          return axiosClient
            .post("auth/token/refresh/", {
              refresh: refreshToken,
            })
            .then(({ data }) => {
              setToken(data);

              axiosClient.defaults.headers[
                "Authorization"
              ] = `bearer ${data.access}`;
              originalRequest.headers[
                "Authorization"
              ] = `bearer ${data.access}`;

              return axiosClient(originalRequest);
            })
            .catch((error) => {
              deleteToken();
              deleteUser();
              window.location = "/login";
            });
        } else {
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    }
  );
};
