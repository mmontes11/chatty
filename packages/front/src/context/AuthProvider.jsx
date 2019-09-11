import React, { createContext, useState } from "react";
import * as localStorage from "helpers/localStorage";

const noop = () => {};

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuth: false,
  login: noop,
  logout: noop,
});

export default props => {
  const [user, setUserState] = useState(localStorage.getUser());
  const [token, setTokenState] = useState(localStorage.getToken());
  const isAuth = user !== null && token !== null;
  const setUser = newUser => {
    setUserState(newUser);
    localStorage.setUser(newUser);
  };
  const setToken = newToken => {
    setTokenState(newToken);
    localStorage.setToken(newToken);
  };
  const removeUser = () => {
    setUserState(null);
    localStorage.removeUser();
  };
  const removeToken = () => {
    setTokenState(null);
    localStorage.removeToken();
  };
  const login = (newUser, newToken) => {
    setUser(newUser);
    setToken(newToken);
  };
  const logout = () => {
    removeUser();
    removeToken();
  };
  const auth = {
    user,
    token,
    isAuth,
    login,
    logout,
  };
  return <AuthContext.Provider value={auth} {...props} />;
};
