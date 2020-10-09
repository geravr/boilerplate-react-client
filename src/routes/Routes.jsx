import React from "react";

// Router
import { Route, Switch } from "react-router-dom";

// Components
import PrivateRoute from "./PrivateRoute";
import UsersContainer from "../pages/Admin/Users/containers/UsersContainer";
import NotFoundPage from "../pages/NotFoundPage";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/admin/users" component={UsersContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
