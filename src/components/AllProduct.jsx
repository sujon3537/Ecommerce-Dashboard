import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Button, Alert } from "antd";

const AllProduct = () => {
  let [allProduct, setAllProduct] = useState([]);
  let [successMsg, setSuccessMsg] = useState("");

  let handleDelete = async (id) => {
    let data = await axios.post(
      "http://localhost:8000/api/v1/product/deleteproduct",
      {
        id: id,
      }
    );
    setSuccessMsg(data.data);
  };

  useEffect(() => {
    async function getAllPro() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/product/getallproduct"
      );
      data.data;
      let arr = [];
      data.data.map((item, index) => {
        arr.push({
          serial: index + 1,
          key: item._id,
          name: item.name,
          image:
            "https://www.startech.com.bd/image/cache/catalog/laptop/samsung/galaxy-book/galaxy-book-01-500x500.webp",
          store: item.store.storeName,
        });
      });
      setAllProduct(arr);
    }
    getAllPro();
  }, []);

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Space size="middle">
          <img src={record.image} alt="product_image" width={45} />
        </Space>
      ),
    },
    {
      title: "Store Name",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button
            onClick={() => handleDelete(record.key)}
            type="primary"
            danger
          >
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
      <Table columns={columns} dataSource={allProduct} />
    </>
  );
};

export default AllProduct;
