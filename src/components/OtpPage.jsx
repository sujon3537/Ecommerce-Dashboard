import React, { useState } from "react";
import { Alert, Button, Card, Form, Input, Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [spinner, setSpinner] = useState(false);
  let [otp, setOtp] = useState("");

  const handleOtpSubmit = async () => {
    setSpinner(true);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/emailverificationotpmatch",
      {
        email: params.email,
        randomOtp: otp,
      }
    );
    if (data.data.error) {
      setSpinner(false);
      setError(data.data.error);
    } else {
      setError("");
      setSpinner(false);
      setSuccess(data.data.success);
      navigate("/login");
    }
  };
  return (
    <Card
      title="OTP Match"
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
        <Form.Item label="Enter OTP">
          <Input name="password" onChange={(e) => setOtp(e.target.value)} />
        </Form.Item>
        <Form.Item>
          {spinner ? (
            <Spin />
          ) : (
            <Button type="primary" onClick={handleOtpSubmit}>
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default OtpPage;
