import React from "react";
import { Link } from "react-router-dom";

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

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Admin">
          <Menu.Item icon={<UserOutlined />} key="2">
            <Link to="/admin/users">Usuarios</Link>
          </Menu.Item>
          <Menu.Item icon={<TeamOutlined />} key="3">
            <Link to="/admin/groups"></Link>
            Grupos
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideNav;
