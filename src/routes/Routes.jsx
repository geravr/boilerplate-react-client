import React from "react";

// Router
import { Route, Switch } from "react-router-dom";

// Components
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import UsersContainer from "../pages/admin/users/containers/UsersContainer";
import GroupsContainer from "../pages/admin/groups/containers/GroupsContainer";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/admin/users" component={UsersContainer} />
      <PrivateRoute path="/admin/groups" component={GroupsContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
