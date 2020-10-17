import React from "react";

// Utils
import logout from "../utils/logout";
import { getUser } from "../utils/userLocalStorage";

// Ant Design
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserProfileDropDown = () => {
  const username = getUser("usrnm");

  const menu = (
    <Menu>
      <Menu.Item style={{ color: "#969696", cursor: "default" }}>
        {username}
      </Menu.Item>
      <Menu.Item onClick={logout}>
        Cerrar sesión
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
