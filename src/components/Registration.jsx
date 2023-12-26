import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Alert, Button, Card, Form, Input, Upload, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [spinner, setSpinner] = useState(false);
  let [regData, setRegData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
    avatarLink: "",
    facebookId: "",
    linkedinId: "",
  });

  const handleFormData = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };
  const handleRegSubmit = async () => {
    setSpinner(true);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/registration",
      {
        fullname: regData.fullname,
        email: regData.email,
        password: regData.password,
        avatar: fileList,
        avatarLink: regData.avatarLink,
        facebookId: "",
        linkedinId: "",
      }
    );
    if (data.data.error) {
      setSpinner(false);
      setError(data.data.error);
    } else {
      setSpinner(false);
      setError("");
      setSuccess(data.data.success);
      navigate(`/otp/${data.data.email}`);
    }
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Card
      title="Registration"
      bordered={true}
      style={{
        width: 500,
        margin: "30px auto 0",
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
        <Form.Item label="Full Name">
          <Input name="fullname" onChange={handleFormData} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={handleFormData} />
        </Form.Item>
        <Form.Item label="Password">
          <Input name="password" type="password" onChange={handleFormData} />
        </Form.Item>

        <Form.Item
          label="Upload Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Or, Upload avatar via link">
          <Input name="avatarLink" onChange={handleFormData} />
        </Form.Item>
        <Form.Item>
          {spinner ? (
            <Spin />
          ) : (
            <Button type="primary" onClick={handleRegSubmit}>
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Registration;
