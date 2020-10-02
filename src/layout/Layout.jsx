import React from "react";
import { Layout } from "antd";

// Components
import SideNav from "./SideNav";
import MainContent from "./MainContent";

const { Header, Footer } = Layout;

const SiderDemo = ({ children }) => {

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <MainContent>
            {children}
        </MainContent>
        <Footer style={{ textAlign: "center" }}>
          <h4>Boilerplate</h4>
          React - Ant Design - Axios - JWT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
