import React, { useState, useEffect } from "react";

// Axios
import axiosClient from "../../../../config/axios";

// Ant Design
import {
  Col,
  Row,
  Space,
  Modal,
  Form,
  Button,
  Input,
  Switch,
  Select,
} from "antd";

const AddGroupForm = ({ modalAddGroup, setModalAddGroup, fetchGroups }) => {
  /*************** States ***************/
  const [createGroupLoading, setCreateGroupLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);

  /*************** Validations ***************/
  const validateMessages = {
    required: "${label} es requerido!",
    types: {
      email: "No es un email válido!",
    },
  };

  /*************** Functions ***************/
  const handleCancel = () => {
    setModalAddGroup(false);
  };

  const onFinish = async (values) => {
    setCreateGroupLoading(true);
    try {
      await axiosClient.post("auth/groups/", values.group);
      await setModalAddGroup(false);
      await fetchGroups();
    } catch (error) {
      setCreateGroupLoading(false);
      console.error(error);
      await setModalAddGroup(false);
    }
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    const fetchGroupsPermissions = async () => {
      const response = await axiosClient.get("auth/permissions/?limit=100");
      setPermissions(response.data.results);
    };
    fetchGroupsPermissions();
  }, []);

  return (
    <Modal
      title="Agregar nuevo grupo"
      visible={modalAddGroup}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
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
            loading={permissions.length === 0}
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
                loading={createGroupLoading}
              >
                Agregar
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddGroupForm;
