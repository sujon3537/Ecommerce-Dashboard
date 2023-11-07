import React, { useState } from "react";
import { Alert, Button, Card, Form, Input, Spin } from "antd";
import axios from "axios";

const Login = () => {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [spinner, setSpinner] = useState(false);
  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async () => {
    setSpinner(true);
    const data = await axios.post("http://localhost:8000/api/v1/auth/login", {
      email: loginData.email,
      password: loginData.password,
    });
    if (data.data.error) {
      setSpinner(false);
      setError(data.data.error);
      console.log(data.data.error);
    } else if (data.data.role == "member") {
      setSpinner(false);
      setError("This login is only for Admin and Merchant");
    } else {
      setError("");
      setSpinner(false);
      setSuccess(data.data.success);
    }
  };
  return (
    <Card
      title="Login"
      bordered={true}
      style={{
        width: 500,
        margin: "100px auto 0",
      }}
    >
      {error && <Alert message={error} type="error" showIcon />}
      {success && <Alert message={success} type="success" showIcon />}
      <Form
        labelCol={{
          span: 12,
        }}
        layout="vertical"
        style={{
          maxWidth: 500,
        }}
      >
        <Form.Item label="Email">
          <Input name="email" onChange={handleFormData} />
        </Form.Item>
        <Form.Item label="Password">
          <Input name="password" type="password" onChange={handleFormData} />
        </Form.Item>
        <Form.Item>
          {spinner ? (
            <Spin />
          ) : (
            <Button type="primary" onClick={handleLoginSubmit}>
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
