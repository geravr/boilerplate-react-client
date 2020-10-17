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