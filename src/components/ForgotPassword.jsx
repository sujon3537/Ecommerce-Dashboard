import React, { useState } from "react";
import { Alert, Button, Card, Form, Input, Spin } from "antd";
import axios from "axios";

const ForgotPassword = () => {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [spinner, setSpinner] = useState(false);
  let [email, setEmail] = useState("");

  const handleSubmit = async () => {
    setSpinner(true);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/forgotpassword",
      {
        email: email,
      }
    );
    if (data.data.error) {
      setSpinner(false);
      setError(data.data.error);
      console.log(data.data.error);
    } else {
      setError("");
      setSpinner(false);
      setSuccess(data.data.success);
      window.location.href = "https://mail.google.com/";
    }
  };
  return (
    <Card
      title="Enter your email to reset password"
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
          <Input name="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item>
          {spinner ? (
            <Spin />
          ) : (
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
