import React from "react";

// Router
import { Route } from "react-router-dom";

// Components
import Layout from "../layout/Layout";

const PrivateRoute = (props) => {
  const { component: Component, path } = props;

  return (
    <Route path={path}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  );
};

export default PrivateRoute;
