import React from "react";

// Router
import { Route, Switch } from "react-router-dom";

// Components
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import LoginContainer from "../auth/LoginContainer";
import UsersContainer from "../pages/admin/UsersContainer";
import GroupsContainer from "../pages/admin/GroupsContainer";
import HomeContainer from "../pages/home/HomeContainer";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <PrivateRoute exact path="/" component={HomeContainer} />
      <PrivateRoute path="/admin/users" component={UsersContainer} />
      <PrivateRoute path="/admin/groups" component={GroupsContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
