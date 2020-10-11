import React from "react";

// Ant Design
import { Table, Tag, Space } from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

// Components
import DeleteGroup from "./DeleteGroup";

const ListGroups = ({
  groups,
  loadingGroups,
  totalItems,
  onChangePagination,
  fetchGroups,
  showModalEdit,
}) => {
  return (
    <Table
      dataSource={groups}
      loading={loadingGroups}
      rowKey="id"
      pagination={{ total: totalItems, onChange: onChangePagination }}
      scroll={{x: true}}
    >
      <Table.Column
        title="Nombre"
        dataIndex="name"
        key="name"
        render={(text) => <a href="#">{text}</a>}
      />

      <Table.Column
        title="Permisos"
        key="permissions"
        dataIndex="permissions"
        render={(permissions) => (
          <>
            {permissions.map((group, index) => {
              if (index === 5) {
                return (
                  <Tag color="geekblue" key={group}>
                    ...
                  </Tag>
                );
              }
              if (index > 5) {
                return;
              }
              return (
                <Tag color="geekblue" key={group}>
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
            <a
              style={{ color: "#000" }}
              onClick={() => showModalEdit(id, row.username)}
            >
              <EditOutlined style={{ fontSize: "18px", color: "#ffc53d" }} />{" "}
              Editar
            </a>
            <DeleteGroup
              id={id}
              name={row.name}
              fetchGroups={fetchGroups}
            >
              <UserDeleteOutlined
                style={{ fontSize: "18px", color: "#ff7a45" }}
              />{" "}
              Eliminar
            </DeleteGroup>
          </Space>
        )}
      />
    </Table>
  );
};

export default ListGroups;
