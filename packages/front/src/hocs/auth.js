import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "hooks/auth";

export const withAuth = Component => props => {
  const auth = useAuth();
  return <Component auth={auth} {...props} />;
};

export const withAuthRedirection = Component => props => {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Redirect to="/chat" />;
  }
  return <Component {...props} />;
};
