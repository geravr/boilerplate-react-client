import React from "react";

// Ant Design
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;

const MainContent = ({ children }) => {
  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
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
