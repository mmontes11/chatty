const prefix = "chatty";
const userKey = `${prefix}.user`;
const tokenKey = `${prefix}.token`;

const getItem = item => window.localStorage.getItem(item);
const setItem = (item, value) => window.localStorage.setItem(item, value);
const removeItem = item => window.localStorage.removeItem(item);

export const getUser = () => getItem(userKey);
export const setUser = user => setItem(userKey, user);
export const removeUser = () => removeItem(userKey);

export const getToken = () => getItem(tokenKey);
export const setToken = token => setItem(tokenKey, token);
export const removeToken = () => removeItem(tokenKey);
