import React from "react";

import { isLogin } from "../utils/isLogin";

// Router
import { Route, Redirect } from "react-router-dom";

// Components
import Layout from "../layout/Layout";

const PrivateRoute = (props) => {
  const { component: Component, path } = props;

  return (
    <>
      {isLogin() ? (
        <Route path={path}>
          <Layout>
            <Component />
          </Layout>
        </Route>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
