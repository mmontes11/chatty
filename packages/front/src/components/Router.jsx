import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import Login from "components/Login";
import SignUp from "components/SignUp";
import Chat from "components/Chat";

const Router = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/sign-up" component={SignUp} />
    <PrivateRoute path="/chat" component={Chat} />
    <Route render={() => <Redirect to="/chat" />} />
  </Switch>
);

export default Router;
