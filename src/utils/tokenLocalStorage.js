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