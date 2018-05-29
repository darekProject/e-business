const TOKEN = 'token';
const USER_NAME = 'username';

export const setToken = (token) => localStorage.setItem(TOKEN, token);

export const setUserName = (name) => localStorage.setItem(USER_NAME, name);

export const getToken = () => localStorage.getItem(TOKEN);

export const getUserName = () => localStorage.getItem(USER_NAME);

export const removeToken = () => localStorage.removeItem(TOKEN);

export const removeUserName = () => localStorage.removeItem(USER_NAME);