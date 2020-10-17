import axios from "axios";

/*************** Default Client ***************/
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_HOST,
});
export default axiosClient;


// Tokens
const TOKEN_KEY_ACCESS = "tknacc";
const TOKEN_KEY_REFRESH = "tknref";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY_ACCESS, token.access);
  if (token.refresh !== undefined) {
    localStorage.setItem(TOKEN_KEY_REFRESH, token.refresh);
  }
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY_ACCESS);
};

export const getRefreshToken = () => {
  return localStorage.getItem(TOKEN_KEY_REFRESH);
};

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY_ACCESS);
  localStorage.removeItem(TOKEN_KEY_REFRESH);
};

// User Profile
export const setUser = (user) => {
  localStorage.setItem('usrnm', user.username);
  localStorage.setItem('usrlvl', user.groups);
};

export const getUser = (userKey) => {
    return localStorage.getItem(userKey);
};

export const deleteUser = () => {
  localStorage.removeItem('usrnm');
  localStorage.removeItem('usrlvl');
};

export const initAxiosInterceptors = () => {
  axiosClient.interceptors.request.use(function (config) {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Axios Interceptors
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
          error.response.data.messages[0].token_class === "AccessToken") || (
            error.response.status === 401 &&
            error.response.data.detail === "Authentication credentials were not provided."
          )
        ) {
          const refreshToken = getRefreshToken();
          return axiosClient.post('auth/token/refresh/', {
            refresh: refreshToken,
          })
            .then(({ data }) => {
              setToken(data);

              axiosClient.defaults.headers["Authorization"] = `bearer ${data.access}`;
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
        deleteUser();
        window.location = "/login";
        return Promise.reject(error);
      }
    }
  );
};