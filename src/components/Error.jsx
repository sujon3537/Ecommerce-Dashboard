import React from "react";
import { Alert, Button } from "antd";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <Alert
        message="Page not found"
        description="The url you visited doesn't exist!"
        type="error"
      />
      <Link to="/">
        <Button type="primary" ghost>
          Go to dashboard
        </Button>
      </Link>
    </>
  );
};

export default Error;
