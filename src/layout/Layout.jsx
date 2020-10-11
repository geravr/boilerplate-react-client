import React from "react";
import Logo from "./Logo";

import { Layout as MainLayout } from "antd";

// Components
import SideNav from "./SideNav";
import MainContent from "./MainContent";

const { Header, Footer } = MainLayout;

const Layout = ({ children, breadcrumb }) => {
  return (
    <MainLayout style={{ minHeight: "100vh" }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <Logo />
      </Header>
      <MainLayout>
        <SideNav />
        <MainLayout className="site-layout">
          <MainContent breadcrumb={breadcrumb} >{children}</MainContent>
          <Footer style={{ textAlign: "center" }}>
            <h4>Boilerplate</h4>
            React - Ant Design - Axios - JWT
          </Footer>
        </MainLayout>
      </MainLayout>
    </MainLayout>
  );
};

export default Layout;
