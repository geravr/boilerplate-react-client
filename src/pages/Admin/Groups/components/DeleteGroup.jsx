import React from "react";

import axiosClient from "../../../../config/axios";

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteGroup = (props) => {
  const { children, color = "#000", name, id, fetchGroups } = props;

  const { confirm } = Modal;
  function showConfirm() {
    confirm({
      title: `¿Estás seguro que deseas eliminar el grupo ${name}?`,
      icon: <ExclamationCircleOutlined />,
      content: "Al eliminar un grupo, este se removerá de los usuarios que lo estén usando y se perderán los permisos heredados!",
      onOk() {
        const deleteUser = async () => {
          try {
            await axiosClient.delete(`auth/groups/${id}/`)
            fetchGroups();
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

export default DeleteGroup;
