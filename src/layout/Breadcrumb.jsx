import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Ant Design
import { Breadcrumb as Breadcrumbd } from "antd";

const Breadcrumb = () => {
  let { pathname: pathLocation } = useLocation();

  const locations = pathLocation.split("/");

  const routes = [];

  locations.map((location, index) => {
    routes.push({
      //path: `/${location}`,
      breadcrumbName: index === 0 ? 'home' : location,
    });
  });

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      // <Link to={paths.join("/")}>
         route.breadcrumbName
      //   </Link>
    );
  };

  return <Breadcrumbd itemRender={itemRender} routes={routes}  style={{marginTop: "10px"}} />;
};

export default Breadcrumb;
