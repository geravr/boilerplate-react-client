import React from "react";

// Utils
import logout from "../utils/logout";

// Ant Design
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserProfileDropDown = () => {

  const menu = (
    <Menu>
      <Menu.Item disabled>
        <a href="foo">
          username
        </a>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <a href="foo">
          Cerrar sesión
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Avatar size="40" icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default UserProfileDropDown;
