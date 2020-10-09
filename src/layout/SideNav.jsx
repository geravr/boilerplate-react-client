import React, { useState } from "react";
import { Link } from "react-router-dom";

// Ant Design
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to="/">
          Dashboard
          </Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Admin">
            <Menu.Item icon={<UserOutlined />} key="2">
          <Link to="/admin/users">
              Usuarios
          </Link>
            </Menu.Item>
          <Menu.Item icon={<TeamOutlined />} key="3">
          <Link to="/admin/groups">
            Grupos
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideNav;