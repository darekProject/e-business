const TOKEN = 'token';
const USER_NAME = 'username';
const USER_ID = 'userID';
const CART = 'productInShoppingCart';

export const setToken = (token) => localStorage.setItem(TOKEN, token);

export const setUserName = (name) => localStorage.setItem(USER_NAME, name);

export const setUserID = id => localStorage.setItem(USER_ID, id);

export const getToken = () => localStorage.getItem(TOKEN);

export const getUserName = () => localStorage.getItem(USER_NAME);

export const getUserID = () => localStorage.getItem(USER_ID);

export const removeToken = () => localStorage.removeItem(TOKEN);

export const removeUserName = () => localStorage.removeItem(USER_NAME);

export const removeUser = () => localStorage.removeItem(USER_ID);

export const removeCart = () => localStorage.removeItem(CART);