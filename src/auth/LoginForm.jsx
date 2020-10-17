import React from "react";

// Ant Design
import { Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = ({ handleSubmit, errorMessage, setErrorMessage }) => {
  return (
    <Card title="Iniciar sesión" style={{ width: 400, textAlign: "center" }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name={["user", "username"]}
          rules={[{ required: true, message: "Ingresa un nombre de usuario!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Usuario"
          />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          rules={[{ required: true, message: "Ingresa una contraseña!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
      {errorMessage && <Alert type="error" message={errorMessage} banner closable afterClose={() => setErrorMessage("")} />}
    </Card>
  );
};

export default LoginForm;
