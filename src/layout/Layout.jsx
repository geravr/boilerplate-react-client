import React from "react";
import { Layout as MainLayout } from "antd";

// Components
import SideNav from "./SideNav";
import MainContent from "./MainContent";

const { Header, Footer } = MainLayout;

const Layout = ({ children }) => {

  return (
    <MainLayout style={{ minHeight: "100vh" }}>
      <SideNav />
      <MainLayout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <MainContent>
            {children}
        </MainContent>
        <Footer style={{ textAlign: "center" }}>
          <h4>Boilerplate</h4>
          React - Ant Design - Axios - JWT
        </Footer>
      </MainLayout>
    </MainLayout>
  );
};

export default Layout;
