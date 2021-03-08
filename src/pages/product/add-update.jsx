import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Input,
  InputNumber,
  Cascader,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqCategorys, reqAddOrUpdateProduct } from "../../api";
import WrappedPicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";
export default function ProductAddUpdate(props) {
  // This is a ref for pictureWall
  const pictureWall = useRef(null);
  // This is a ref for richTextEditor
  const richTextEditor = useRef(null);
  const [options, setOptions] = useState([]);
  const [product] = useState(props.location.state || { product: {} });
  const [categoryName, setCategoryName] = useState([]);

  useEffect(() => {
    async function getCategorys(parentId) {
      const result = await reqCategorys(parentId);
      if (result.status === 0) {
        const categorys = result.data;
        const options = rawCategorys2options(categorys, parentId);
        setOptions(options);
      }
    }
    // parentId is 0, means we are get the main categorys, after first load
    getCategorys("0");
  }, []);

  useEffect(() => {
    function loadCategorys() {
      const category = [];
      const { pCategoryId, categoryId } = product.product;
      if (pCategoryId === "0") {
        const categoryName = options.find(
          (option) => option.value === categoryId
        );
        if (categoryName) {
          category.push(categoryName.value);
          setCategoryName(category);
        }
      }
    }
    loadCategorys();
  }, [options, product.product]);

  const validateMessages = {
    required: "'${name}' is required",
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 17 },
  };

  async function onFinish(values) {
    console.log(values);
    const { Category, Description, Price, name } = values;
    console.log(Category, Description, Price, name);
    console.log(
      richTextEditor.current.getHtmlContext(),
      pictureWall.current.getFileList()
    );

    // initialize two category variable
    let categoryId = "";
    let pCategoryId = "";
    // categorys contains a array to store pcategoryId  and category, so we can determine by the array length
    if (Category.length === 1) {
      pCategoryId = "0";
      categoryId = Category[0];
    }
    if (Category.length === 2) {
      pCategoryId = Category[0];
      categoryId = Category[1];
    }
    const imgs = pictureWall.current.getFileList();
    const detail = richTextEditor.current.getHtmlContext();
    const product = {
      pCategoryId: pCategoryId,
      categoryId: categoryId,
      name: name,
      desc: Description,
      price: Price.toString(),
      detail: detail,
      imgs: imgs,
    };
    // if (Object.keys(product).length) console.log(product);
    console.log(product);
    const result = await reqAddOrUpdateProduct(product);
    if (result.status === 0) message.success("Add Product Success");
    if (result.status === 1) message.error("Add Product Error");
  }

  async function loadData(selectedOptions) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const result = await reqCategorys(targetOption.value);
    if (result.status === 0) {
      // turn off the loading
      targetOption.loading = false;
      // update children array with new options
      targetOption.children = rawCategorys2options(result.data);
      setOptions([...options]);
    }
  }
  /**
   * @description: This a function that take parentId and category use map function make
   * each element in the array transfer to a option object (label, value, isLeaf)
   * @param {*} categorys
   * @param {*} parentId
   * @return {*}
   */
  function rawCategorys2options(categorys, parentId) {
    //  This is a one way to use js map that write map return statement, you can also write without return
    // const options = categorys.map((category) => {
    //   const option = {
    //     label: category.name,
    //     value: category._id,
    //     isLeaf: false,
    //   };
    //   return option;
    // });

    // This version doesn't have return statement, simply just use () wrap your return
    const options = categorys.map((category) => ({
      value: category._id,
      label: category.name,
      isLeaf: false,
    }));
    // if parentId is is not 0 , means it is subcategory, we change isLeaf to true
    if (parentId !== "0") options.map((option) => (option.isLeaf = true));
    return options;
  }

  return (
    <Card
      title={
        <span>
          <ArrowLeftOutlined
            style={{ marginRight: "5px", color: "green" }}
            onClick={() => props.history.goBack()}
          />
          {/* check if the product is empty object or not thourgh {} length */}
          {Object.keys(product).length ? "Update Product" : "Product Details"}
        </span>
      }
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["name"]}
          initialValue={product.product.name}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={product.product.desc}
          name={["Description"]}
          rules={[{ required: true }]}
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          initialValue={product.product.price}
          name={["Price"]}
          label="Price"
          rules={[{ type: "number", min: 0, required: true }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item
          name={["Category"]}
          rules={[{ required: true }]}
          label="Category"
        >
          <Cascader
            options={options}
            loadData={loadData}
            changeOnSelect
            value={categoryName}
          />
        </Form.Item>
        <Form.Item
          initialValue={product.price}
          name={["user", "RichTextEditor"]}
          label="Product Detail"
        >
          <RichTextEditor
            ref={richTextEditor}
            detail={product.product.detail}
          ></RichTextEditor>
        </Form.Item>
        <Form.Item name={["Preview"]} label="Picture Preview">
          <WrappedPicturesWall
            ref={pictureWall}
            imgs={product.product.imgs}
          ></WrappedPicturesWall>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
