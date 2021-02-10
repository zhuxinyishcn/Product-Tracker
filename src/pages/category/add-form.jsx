import React, { Component } from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

export default class AddForm extends Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.setFieldsValue({
      changedName: null,
      categoryName: "",
    });
  };
  render() {
    return (
      <Form onFinish={this.onFinish} ref={this.formRef}>
        <Form.Item name="categoryName" label="Category Name">
          <Select
            placeholder="Select a option and change input text above"
            onChange={this.onChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item name="changedName" label="New Category Name">
          <Input placeholder="Please Input New Category Name" />
        </Form.Item>
        <Button htmlType="button" onClick={this.onReset}>
          Reset
        </Button>
      </Form>
    );
  }
}
