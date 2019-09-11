import React from "react";
import { useAuth } from "hooks/auth";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = props => {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;
