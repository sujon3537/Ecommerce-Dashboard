import React, { useEffect, useState } from "react";
import { Input, Select, Tag, Button } from "antd";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const AddProduct = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [allStoreList, setAllStoreList] = useState([]);

  let [name, setName] = useState("");
  let desc = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  let [storeName, setStoreName] = useState("");

  const handleAddProduct = async () => {
    console.log("name", name);
    console.log(
      "des",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    console.log("Store", storeName);
    const data = await axios.post(
      "http://localhost:8000/api/v1/product/createproduct",
      {
        name: name,
        description: desc,
        store: storeName,
      }
    );
    console.log(data);
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    async function allStore() {
      let arr = [];
      let data = await axios.get(
        "http://localhost:8000/api/v1/merchant/getallstore"
      );
      data.data.map((item) =>
        arr.push({
          value: item._id,
          label: item.storeName,
        })
      );
      setAllStoreList(arr);
    }
    allStore();
  }, []);

  const options = [
    {
      value: "gold",
    },
    {
      value: "lime",
    },
    {
      value: "green",
    },
    {
      value: "cyan",
    },
    {
      value: "black",
    },
    {
      value: "blue",
    },
  ];

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <>
      <Input
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <h3>Product Description</h3>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <br />
      <br />
      <h3>Select Product Variant</h3>
      <Select
        mode="multiple"
        tagRender={tagRender}
        defaultValue={["gold", "cyan"]}
        style={{
          width: "100%",
        }}
        options={options}
      />
      <br />
      <br />
      <h3>Select Product Store</h3>
      <Select
        mode="single"
        tagRender={tagRender}
        defaultValue={["gold"]}
        style={{
          width: "100%",
        }}
        onChange={(e) => setStoreName(e)}
        options={allStoreList}
      />
      <br />
      <br />
      <Button type="primary" onClick={handleAddProduct}>
        Add Product
      </Button>
    </>
  );
};

export default AddProduct;
