import React from "react";

import axiosClient from "../../../../config/axios";

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteUser = (props) => {
  const { children, color = "#000", username, userId, fetchUsers } = props;

  const { confirm } = Modal;
  function showConfirm() {
    confirm({
      title: `¿Estás seguro que deseas eliminar el usuario ${username}?`,
      icon: <ExclamationCircleOutlined />,
      content: "Un usuario eliminado no se puede recuperar!",
      onOk() {
        const deleteUser = async () => {
          try {
            await axiosClient.delete(`auth/users/${userId}/`)
            fetchUsers();
          } catch (error) {
            console.error(error);
          }
        }
        deleteUser();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <a style={{ color: color }} onClick={showConfirm}>
      {children}
    </a>
  );
};

export default DeleteUser;
