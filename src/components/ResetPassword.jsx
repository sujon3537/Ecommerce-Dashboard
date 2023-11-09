import React, { useState } from "react";
import { Alert, Button, Card, Form, Input, Spin } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
const ResetPassword = () => {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [spinner, setSpinner] = useState(false);
  let [newPassword, setNewPassword] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const handleSubmit = async () => {
    setSpinner(true);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/resetpassword",
      {
        email: searchParams.get("email"),
        newPassword: newPassword,
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
      navigate("/login");
    }
  };
  return (
    <Card
      title="Enter new password to reset password"
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
        <Form.Item label="New Password">
          <Input
            name="newPassword"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
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

export default ResetPassword;
