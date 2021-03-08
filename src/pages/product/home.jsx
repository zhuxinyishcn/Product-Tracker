import React, { Component } from "react";
import { Table, Card, Input, Select, Switch, message, Button } from "antd";
import { AudioOutlined, PlusCircleOutlined } from "@ant-design/icons";
import LinkButtom from "../../components/link-buttom";
import {
  reqProductList,
  reqSearchProduct,
  reqUpdateStatus,
} from "../../api/index";
import { PAGE_SIZE } from "../../utils/constants";

const { Option } = Select;
const { Search } = Input;

export default class Home extends Component {
  state = {
    // product list fo table
    products: [],
    // a number to keep track of the total number of products
    total: 0,
    loading: false,
    // search type for the product by productName / productDes
    searchType: "productName",
    // search value for the product by productName / productDes
    searchValue: "",
  };

  getProducts = async (pageNum) => {
    // save pageNum, for other function
    this.pageNum = pageNum;
    this.setState({ loading: true });
    const { searchType, searchValue } = this.state;
    let result;
    // check if we have search value
    if (searchValue)
      result = await reqSearchProduct(
        pageNum,
        PAGE_SIZE,
        searchValue,
        searchType
      );
    if (!searchValue) result = await reqProductList(pageNum, PAGE_SIZE);
    this.setState({ loading: false });
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({ total, products: list });
    }
  };
  /**
   * @description: initial the columns for table
   * @param {*} initColumns
   *
   */
  initColumns = () => {
    this.columns = [
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        // in the current nidex , we have current price
        render: (price) => "$" + price,
      },
      {
        width: "200px",
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status, product) => {
          return (
            <span>
              <Switch
                checkedChildren="In Stock"
                unCheckedChildren="Out of Stock"
                defaultChecked={status === 1 ? true : false}
                onChange={(status) => {
                  this.updateStatus(product._id, status);
                }}
              />
              <span></span>
            </span>
          );
        },
      },
      {
        title: "Action",
        dataIndex: "",
        key: "action",
        render: (product) => (
          <span>
            <LinkButtom
              onClick={() =>
                this.props.history.push("/product/detail", { product })
              }
            >
              Detail
            </LinkButtom>
            <LinkButtom
              onClick={() =>
                this.props.history.push("/product/addupdate", { product })
              }
            >
              Update
            </LinkButtom>
          </span>
        ),
      },
    ];
  };

  // This is a function
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success("Update Status Success :)");
      this.getProducts(this.pageNum);
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  UNSAFE_componentWillMount() {
    this.getProducts(1);
  }

  render() {
    const { products, total, loading } = this.state;
    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/product/addupdate")}
      >
        <PlusCircleOutlined />
        Add Product
      </Button>
    );
    const title = (
      <span>
        <Select
          showSearch
          optionFilterProp="children"
          defaultValue="productName"
          style={{ width: 200 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">Search by Names</Option>
          <Option value="productDesc">Seach by Description</Option>
        </Select>
        <Search
          placeholder="Type the item name/description to search..."
          enterButton="Search"
          size="middle"
          allowClear
          style={{ width: 420, margin: "0 10px" }}
          suffix={<AudioOutlined style={{ color: "#1890ff" }} />}
          onChange={(event) =>
            this.setState({ searchValue: event.target.value })
          }
          onSearch={() => this.getProducts(1)}
        />
      </span>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          columns={this.columns}
          dataSource={products}
          expandable={{
            expandedRowRender: (record) => <p>{record.detail}</p>,
          }}
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            total,
            defaultPageSize: PAGE_SIZE,
            onChange: this.getProducts,
          }}
        />
      </Card>
    );
  }
}
