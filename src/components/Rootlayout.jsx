import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  RestOutlined,
  MenuOutlined,
  BarsOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { Menu, Col, Row } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Users List", "sub1", <UserOutlined />, [
    getItem("Merchant", "1"),
    getItem("Users", "/login"),
  ]),
  {
    type: "divider",
  },
  getItem("Product", "sub2", <RestOutlined />, [
    getItem("Add Product", "/addproduct"),
    getItem("All Products", "/allproduct"),
    getItem("All Variants", "/allvariant"),
  ]),
  {
    type: "divider",
  },
  getItem("Category", "sub3", <MenuOutlined />, [
    getItem("Add Category", "5"),
    getItem("All Category", "6"),
  ]),
  {
    type: "divider",
  },
  getItem("Sub Category", "sub4", <BarsOutlined />, [
    getItem("Add Sub Category", "7"),
    getItem("All Sub Category", "8"),
  ]),
  {
    type: "divider",
  },
  getItem("Discount", "sub5", <GiftOutlined />, [
    getItem("Add Discount", "9"),
    getItem("All Discount", "10"),
  ]),
];

const Rootlayout = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <>
      <Row>
        <Col span={6}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={14}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default Rootlayout;
