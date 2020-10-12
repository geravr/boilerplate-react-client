import React from "react";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

// Ant Design
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = () => {
  let { pathname: pathLocation } = useLocation();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu theme="dark" defaultSelectedKeys={["/"]} selectedKeys={[pathLocation]} mode="inline">
        <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
        </Menu.Item>
        <SubMenu key="/admin" icon={<AppstoreOutlined />} title="Admin">
          <Menu.Item icon={<UserOutlined />} key="/admin/users">
            <Link to="/admin/users">Usuarios</Link>
          </Menu.Item>
          <Menu.Item icon={<TeamOutlined />} key="/admin/groups">
            <Link to="/admin/groups"></Link>
            Grupos
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideNav;
