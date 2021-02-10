import React, { Component } from "react";
import { Table, Card, Button, message, Modal } from "antd";
import { PlusCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import LinkButtom from "../../components/link-buttom";
import {
  reqCategorys,
  reqUpdateCategory,
  reqAddCategory,
} from "../../api/index";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default class Category extends Component {
  state = {
    // a loading variable to determine wether still loading data
    loading: false,
    // a array to store main categorys
    categorys: [],
    // a array to store sub categorys
    subCategorys: [],
    // current list's parent id, default is the main list
    parentId: "0",
    // current list's parent name, default is the empty string
    parentName: "",
    // update / add modal if pop up, 0 is default means hide the modal, 1 means pops up add categorys, 2 means update categorys
    showStatus: 0,
  };

  // show update categorys modal
  showUpdate = (category) => {
    // save category object
    this.category = category;
    // update state to show up the modal
    this.setState({ showStatus: 2 });
  };

  // show add categorys modal
  showAdd = () => {
    this.setState({ showStatus: 1 });
  };

  addCategory = () => {
    console.log("addCategory");
  };

  updateCategory = async () => {
    // // close modal
    this.setState({
      showStatus: 0,
    });
    const categoryId = this.category._id;
    const categoryName = this.form.current.getFieldValue("changedName");
    // clear all form input
    this.form.current.resetFields();
    const result = await reqUpdateCategory(categoryId, categoryName);
    // refresh categorys to get new list
    if (result.status === 0) this.getCategorys();
  };

  /**
   * @description: a function handle when click cancel buttom
   * @param {*} handleCancel
   */
  handleCancel = () => {
    // clear all form input
    this.form.current.resetFields();
    this.setState({
      showStatus: 0,
    });
  };

  /**
   * @description: initilize all column for the table, before data comes
   * @param {*} initColumns
   *
   */
  initColumns = () => {
    this.columns = [
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Actions",
        render: (category) => (
          <span>
            <LinkButtom onClick={() => this.showUpdate(category)}>
              Update
            </LinkButtom>
            {/**
             * here is an example how to pass parameter to callback function:
             * define an anonymous function, then call function and pass parameter
             **/}
            {this.state.parentId === "0" ? (
              <LinkButtom onClick={() => this.showSubCategorys(category)}>
                Detail
              </LinkButtom>
            ) : null}
          </span>
        ),
      },
    ];
  };

  /**
   * @description: This is a function get main / sub Categorys list from the backend server
   * @param {*} getCategorys
   * @return {*}
   */
  getCategorys = async () => {
    // before we get the result from the backend, we satrt loading
    this.setState({ loading: true });
    const { parentId } = this.state;
    const result = await reqCategorys(parentId);
    // after we get the result from the backend, we stop loading
    this.setState({ loading: false });
    if (result.status !== 0) message.error("Request Categorys Failed.");
    if (result.status === 0) {
      const categorys = result.data;
      // if the parentid indicate it is the main list, update the main categorys
      if (parentId === "0") this.setState({ categorys: categorys });
      // if  the parentid indicate it is the sub list, update the subCategorys
      if (parentId !== "0") this.setState({ subCategorys: categorys });
    }
  };

  showMainCategory = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    });
  };

  showSubCategorys = (categorys) => {
    this.setState(
      { parentId: categorys._id, parentName: categorys.name },
      () => {
        this.getCategorys();
      }
    );
  };

  // prepare data for first render()
  componentWillMount() {
    this.initColumns();
  }

  // execute asynchronous task
  componentDidMount() {
    // get main Categorys menu
    this.getCategorys();
  }

  render() {
    const {
      categorys,
      subCategorys,
      parentId,
      parentName,
      loading,
      showStatus,
    } = this.state;

    // this is a category object from column data
    const category = this.category || {};

    const title =
      parentId === "0" ? (
        "Main Category List"
      ) : (
        <span>
          <LinkButtom onClick={this.showMainCategory}>
            Main Category List
          </LinkButtom>
          <CaretRightOutlined />
          {parentName}
        </span>
      );

    return (
      <Card
        title={title}
        extra={
          <Button type="primary" onClick={this.showAdd}>
            <PlusCircleOutlined />
            Add More Products
          </Button>
        }
      >
        <Table
          bordered
          rowKey="_id"
          columns={this.columns}
          // check if parentId is 0, if it is 0 , we need our data from main categorys
          dataSource={parentId === "0" ? categorys : subCategorys}
          loading={loading}
          pagination={{ defaultPageSize: 7, showQuickJumper: true }}
        />
        <Modal
          title="Add Category"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm></AddForm>
        </Modal>
        <Modal
          title="Update Category"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {
              this.form = form;
            }}
          ></UpdateForm>
        </Modal>
      </Card>
    );
  }
}
