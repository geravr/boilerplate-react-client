import React, { useState, useEffect } from "react";

// Axios
import axiosClient from "../config/axios";
import { fetchCurrentUser, isLogin } from "../utils/isLogin";

// Utils
import { setToken } from "../utils/tokenLocalStorage";

// Router
import { useHistory } from 'react-router-dom';

// Ant Design
import { Row, Col } from "antd";

// Components
import Logo from "../layout/Logo";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
  /*************** States ***************/
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState("");

  /*************** Functions ***************/
  const history = useHistory();
  
  const handleSubmit = async (values) => {
    try {
      const response = await axiosClient.post(
        "auth/token/obtain/",
        values.user
      );
      setToken(response.data);
      const userData = await fetchCurrentUser();
      setUser(userData);
    } catch (error) {
      setErrorMessage(error.response.data.detail);
    }
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    if (isLogin()) {
      history.push('/');
    }
  }, [user])

  return (
    <Row justify="center" align="middle">
      <Col>
        <Row justify="center">
          <Col>
            <Logo height="40" fontSize="40px" fontColor="#434343" />
          </Col>
        </Row>
        <Row>
          <Col>
            <LoginForm
              handleSubmit={handleSubmit}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginContainer;
