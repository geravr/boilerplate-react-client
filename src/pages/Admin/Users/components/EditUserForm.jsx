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

const EditUserForm = ({
  modalEditUser,
  setModalEditUser,
  fetchUsers,
  userToEdit,
}) => {
  /*************** States ***************/
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const [groupsPermisions, setGroupsPermissions] = useState([]);
  const [user, setUser] = useState(null);

  /*************** Validations ***************/
  const validateMessages = {
    required: "${label} es requerido!",
    types: {
      email: "No es un email válido!",
    },
  };

  /*************** Functions ***************/
  const handleCancel = () => {
    setModalEditUser(false);
  };

  const onFinish = async (values) => {
    setUpdateUserLoading(true);
    try {
      await axiosClient.patch(`auth/users/${userToEdit.id}/`, values.user);
      await setModalEditUser(false);
      await fetchUsers();
    } catch (error) {
      setUpdateUserLoading(false);
      console.error(error);
      await setModalEditUser(false);
    }
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    const fetchGroupsPermissions = async () => {
      const response = await axiosClient.get("auth/groups/");
      setGroupsPermissions(response.data.results);
    };
    const fetchUser = async () => {
      const response = await axiosClient.get(`auth/users/${userToEdit.id}/`);
      const user = response.data;
      setUser({ user });
    };
    fetchGroupsPermissions();
    fetchUser();
  }, []);

  return (
    <Modal
      title={`Editar usuario ${userToEdit.username}`}
      visible={modalEditUser}
      onCancel={handleCancel}
      footer={null}
    >
      {user && (
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name="nest-messages"
          initialValues={user}
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
          <Form.Item name={["user", "last_name"]} label="Apellido(s)">
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
                  loading={updateUserLoading}
                >
                  Actualizar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default EditUserForm;
