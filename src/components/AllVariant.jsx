import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Button, Alert } from "antd";

const AllVariant = () => {
  let [allVariant, setAllVariant] = useState([]);
  let [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function getAllVar() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/getallvariant"
      );
      data.data;
      let arr = [];
      data.data.map((item, index) => {
        arr.push({
          serial: index + 1,
          key: item._id,
          image: item.image,
        });
      });
      setAllVariant(arr);
    }
    getAllVar();
  }, []);

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Space size="middle">
          <img src={record.image} alt="product_image" width={100} />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      {successMsg && (
        <Alert message={successMsg} type="success" showIcon closable />
      )}
      <Table columns={columns} dataSource={allVariant} />
    </>
  );
};

export default AllVariant;
