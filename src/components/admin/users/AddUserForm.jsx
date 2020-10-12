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
  Switch,
  Select,
} from "antd";

const AddUserForm = ({ modalAddUser, setModalAddUser, fetchUsers }) => {
  /*************** States ***************/
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [groupsPermisions, setGroupsPermissions] = useState([]);

  /*************** Validations ***************/
  const validateMessages = {
    required: "${label} es requerido!",
    types: {
      email: "No es un email válido!",
    },
  };

  /*************** Functions ***************/
  const handleCancel = () => {
    setModalAddUser(false);
  };

  const onFinish = async (values) => {
    setCreateUserLoading(true);
    try {
      await axiosClient.post("auth/users/", values.user);
      await setModalAddUser(false);
      await fetchUsers();
    } catch (error) {
      setCreateUserLoading(false);
      console.error(error);
      await setModalAddUser(false);
    }
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    const fetchGroupsPermissions = async () => {
      const response = await axiosClient.get("auth/groups/");
      setGroupsPermissions(response.data.results);
    };
    fetchGroupsPermissions();
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      title="Agregar nuevo usuario"
      visible={modalAddUser}
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
          name={["user", "first_name"]}
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
          name={["user", "last_name"]}
          label="Apellido(s)"
          initialValue=""
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "username"]}
          label="Usuario"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "La contraseña es requerida!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row>
          <Col span={10}>
            <Form.Item
              name={["user", "is_active"]}
              initialValue={true}
              label="Usuario activo"
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 4 }}
            >
              <Switch defaultChecked />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name={["user", "is_staff"]}
              initialValue={false}
              label="Es administrador"
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 4 }}
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name={["user", "groups"]}
          label="Grupo de permisos"
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 8 }}
          initialValue={[]}
          rules={[
            {
              required: true,
              message: "Por favor selecciona al menos un grupo",
              type: "array",
            },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Selecciona un grupo"
            loading={groupsPermisions.length === 0}
          >
            {groupsPermisions.map((group) => (
              <Select.Option key={group.id} value={group.name}>
                {group.name}
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
                loading={createUserLoading}
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

export default AddUserForm;
