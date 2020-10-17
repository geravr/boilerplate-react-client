import React, { useState, useEffect } from "react";

// Axios
import axiosClient from "../../../config/axios";

// Ant Design
import {
  Col,
  Row,
  Space,
  Modal,
  Form,
  Button,
  Input,
  Select,
  Skeleton,
} from "antd";

const EditGroupForm = ({
  modalEditGroup,
  setModalEditGroup,
  fetchGroups,
  groupToEdit,
}) => {
  /*************** States ***************/
  const [updateGroupLoading, setUpdateGroupLoading] = useState(false);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [group, setGroup] = useState(null);

  /*************** Validations ***************/
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} es requerido!",
    types: {
      email: "No es un email válido!",
    },
  };

  /*************** Functions ***************/
  const handleCancel = () => {
    setModalEditGroup(false);
  };

  const onFinish = async (values) => {
    setUpdateGroupLoading(true);
    try {
      await axiosClient.patch(`auth/groups/${groupToEdit.id}/`, values.group);
      await setModalEditGroup(false);
      await fetchGroups();
    } catch (error) {
      setUpdateGroupLoading(false);
      console.error(error);
      await setModalEditGroup(false);
    }
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    const fetchPermissions = async () => {
      setPermissionsLoading(true);
      const response = await axiosClient.get("auth/permissions/?limit=100");
      setPermissions(response.data.results);
      setPermissionsLoading(false);
    };
    const fetchGroup = async () => {
      const response = await axiosClient.get(`auth/groups/${groupToEdit.id}/`);
      const group = response.data;
      setGroup({ group });
    };
    fetchPermissions();
    fetchGroup();
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      title={`Editar grupo ${groupToEdit.name}`}
      visible={modalEditGroup}
      onCancel={handleCancel}
      footer={null}
    >
      {!group ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={group}
        >
          <Form.Item
            name={["group", "name"]}
            label="Nombre"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["group", "permissions"]}
            label="Permisos"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValue={[]}
            rules={[
              {
                required: true,
                message: "Por favor selecciona al menos un permiso",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Selecciona un permiso"
              loading={permissionsLoading}
            >
              {permissions.map((permission) => (
                <Select.Option key={permission.id} value={permission.name}>
                  {permission.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Row justify="end">
            <Col>
              <Space>
                <Button key="back" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button
                  key="submit"
                  htmlType="submit"
                  type="primary"
                  loading={updateGroupLoading}
                >
                  Agregar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default EditGroupForm;
