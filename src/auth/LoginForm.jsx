import React from "react";

// Ant Design
import { Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = ({ onFinish, errorMessage, setErrorMessage }) => {
  return (
    <Card title="Iniciar sesión" style={{ width: 400, textAlign: "center" }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name={["user", "username"]}
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      {errorMessage && <Alert type="error" message={errorMessage} banner closable afterClose={() => setErrorMessage("")} />}
    </Card>
  );
};

export default LoginForm;
