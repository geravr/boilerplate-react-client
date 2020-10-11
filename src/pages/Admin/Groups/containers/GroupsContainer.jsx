import React, { useState, useEffect } from "react";
import axiosClient from "./../../../../config/axios";

// Ant Design
import { Row, Col, Button } from "antd";
import { TeamOutlined } from "@ant-design/icons";

// Components
import ListGroups from "../components/ListGroups";
import AddGroupForm from "../components/AddGroupForm";
import EditGroupForm from "../components/EditGroupForm";

const GroupsContainer = () => {
  /*************** States ***************/
  const [groups, setGroups] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPagePagination, setCurrentPagePagination] = useState(1);
  const [modalAddGroup, setModalAddGroup] = useState(false);
  const [modalEditGroup, setModalEditGroup] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);

  /*************** Functions ***************/
  const showModalAdd = () => {
    setModalAddGroup(true);
  };
  const showModalEdit = (id, name) => {
    setModalEditGroup(true);
    setGroupToEdit({
      id,
      name,
    });
  };

  const fetchGroups = async () => {
    const response = await axiosClient.get(
      `auth/groups/?page=${currentPagePagination}`
    );
    const { count, results } = response.data;
    setGroups(results);
    setTotalItems(count);
  };

  const onChangePagination = (page, pageSize) => {
    setCurrentPagePagination(page);
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    fetchGroups();
  }, [currentPagePagination]);

  return (
    <>
      {modalAddGroup && (
        <AddGroupForm
          modalAddGroup={modalAddGroup}
          setModalAddGroup={setModalAddGroup}
          fetchGroups={fetchGroups}
        />
      )}
      {modalEditGroup && (
        <EditGroupForm
          modalEditGroup={modalEditGroup}
          setModalEditGroup={setModalEditGroup}
          groupToEdit={groupToEdit}
          fetchGroups={fetchGroups}
        />
      )}
      <Row>
        <Col span={24}>
          <Row justify="space-between" style={{ padding: "0 0.5rem" }}>
            <Col>
              <h2>Listado de grupos</h2>
            </Col>
            <Col>
              <Button
                type="primary"
                shape="round"
                icon={<TeamOutlined />}
                onClick={showModalAdd}
              >
                Nuevo grupo
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ListGroups
                groups={groups}
                totalItems={totalItems}
                onChangePagination={onChangePagination}
                fetchGroups={fetchGroups}
                showModalEdit={showModalEdit}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default GroupsContainer;
