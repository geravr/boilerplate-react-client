import React from "react";

// Ant Design
import { Table, Tag, Space } from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";

// Components
import DeleteUser from "./DeleteUser";

const ListUsers = ({
  dataUsers,
  totalItems,
  onChangePagination,
  fetchUsers,
  showModalEdit
}) => {
  return (
    <Table
      dataSource={dataUsers}
      rowKey="id"
      pagination={{ total: totalItems, onChange: onChangePagination }}
      scroll={{x: true}}
    >
      <Table.Column
        title="Username"
        dataIndex="username"
        key="username"
        render={(text) => <a href="#">{text}</a>}
      />

      <Table.Column
        title="Nombre"
        dataIndex="first_name"
        key="first_name"
        render={(first_name, row) => <>{`${first_name} ${row.last_name}`}</>}
      />

      <Table.Column
        title="Activo"
        dataIndex="is_active"
        key="is_active"
        align="center"
        render={(is_active) => (
          <>
            {is_active ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#fa541c" />
            )}
          </>
        )}
      />

      <Table.Column
        title="Admin"
        dataIndex="is_staff"
        key="is_staff"
        align="center"
        render={(is_staff) => (
          <>
            {is_staff ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#fa541c" />
            )}
          </>
        )}
      />

      <Table.Column
        title="Grupos"
        key="groups"
        dataIndex="groups"
        render={(groups) => (
          <>
            {groups.map((group) => {
              let color = "geekblue";
              if (group === "test") {
                color = "purple";
              }
              return (
                <Tag color={color} key={group}>
                  {group}
                </Tag>
              );
            })}
          </>
        )}
      />

      <Table.Column
        title="Acción"
        key="id"
        dataIndex="id"
        render={(id, row) => (
          <Space size="middle">
            <a style={{ color: "#000" }} onClick={() => showModalEdit(id, row.username)}>
              <EditOutlined style={{ fontSize: "18px", color: "#ffc53d" }} />{" "}
              Editar
            </a>
            <DeleteUser
              userId={id}
              username={row.username}
              fetchUsers={fetchUsers}
            >
              <UserDeleteOutlined
                style={{ fontSize: "18px", color: "#ff7a45" }}
              />{" "}
              Eliminar
            </DeleteUser>
          </Space>
        )}
      />
    </Table>
  );
};

export default ListUsers;
