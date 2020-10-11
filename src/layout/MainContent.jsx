import React from "react";

import Breadcrumb from "./Breadcrumb";

// Ant Design
import { Layout } from "antd";

const { Content } = Layout;

const MainContent = ({ children, breadcrumb: BreadcrumbComponent }) => {
  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        {children}
      </div>
    </Content>
  );
};

export default MainContent;
