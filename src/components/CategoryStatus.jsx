import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

const CategoryStatus = () => {
  const [allcat, setAllcat] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      sorter: (a, b) => a.serial - b.serial,
    },
    {
      title: "Name",
      dataIndex: "name",
      filters: filterArr,
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: "30%",
    },
    {
      title: "Active",
      dataIndex: "active",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "approved",
          value: "approved",
        },
        {
          text: "rejected",
          value: "rejected",
        },
        {
          text: "waiting",
          value: "waiting",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: false,
      width: "40%",
    },
  ];

  const arr = [];
  const filters = [];
  useEffect(() => {
    async function allcategory() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/category/getallcategory"
      );
      data.data.map((item, index) => {
        arr.push({
          serial: index + 1,
          key: item._id,
          name: item.name,
          active: item.isActive ? "Active" : "Inactive",
          status: item.status,
        });
        filters.push({
          text: item.name,
          value: item.name,
        });
      });
      setAllcat(arr);
      setFilterArr(filters);
    }
    allcategory();
  }, []);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Table columns={columns} dataSource={allcat} onChange={onChange} />
    </>
  );
};

export default CategoryStatus;
