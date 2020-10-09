import React, { useState, useEffect } from "react";
import axiosClient from "./../../../../config/axios";

// Ant Design
import { Row, Col, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

// Components
import ListUsers from "../components/ListUsers";
import AddUserForm from "../components/AddUserForm";
import EditUserForm from "../components/EditUserForm";

const UsersContainer = () => {
  /*************** States ***************/
  const [dataUsers, setDataUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPagePagination, setCurrentPagePagination] = useState(1);
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  /*************** Functions ***************/
  const showModalAdd = () => {
    setModalAddUser(true);
  };
  const showModalEdit = (id, username) => {
    setModalEditUser(true);
    setUserToEdit({
      id,
      username,
    });
  };

  const fetchUsers = async () => {
    const response = await axiosClient.get(
      `auth/users/?page=${currentPagePagination}`
    );
    const { count, results } = response.data;
    setDataUsers(results);
    setTotalItems(count);
  };

  const onChangePagination = (page, pageSize) => {
    setCurrentPagePagination(page);
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    fetchUsers();
  }, [currentPagePagination]);

  return (
    <>
      {modalAddUser && (
        <AddUserForm
          modalAddUser={modalAddUser}
          setModalAddUser={setModalAddUser}
          fetchUsers={fetchUsers}
        />
      )}
      {modalEditUser && (
        <EditUserForm
          modalEditUser={modalEditUser}
          setModalEditUser={setModalEditUser}
          userToEdit={userToEdit}
          fetchUsers={fetchUsers}
        />
      )}
      <Row>
        <Col span={24}>
          <Row justify="space-between" style={{ padding: "0 0.5rem" }}>
            <Col>
              <h2>Listado de usuarios</h2>
            </Col>
            <Col>
              <Button
                type="primary"
                shape="round"
                icon={<UserAddOutlined />}
                onClick={showModalAdd}
              >
                Nuevo usuario
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ListUsers
                dataUsers={dataUsers}
                totalItems={totalItems}
                onChangePagination={onChangePagination}
                fetchUsers={fetchUsers}
                showModalEdit={showModalEdit}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default UsersContainer;
