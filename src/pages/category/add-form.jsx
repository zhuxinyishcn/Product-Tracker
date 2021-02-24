import React, { Component } from "react";
import { Form, Input, Button, Select } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

export default class AddForm extends Component {
  static propTypes = {
    // main category list
    categorys: PropTypes.array.isRequired,
    // pass form through this function
    setForm: PropTypes.func.isRequired,
  };
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  componentWillMount() {
    // pass form object to father component
    this.props.setForm(this.formRef);
  }

  render() {
    const { categorys } = this.props;
    return (
      <Form onFinish={this.onFinish} ref={this.formRef}>
        <Form.Item name="categoryId" label="Category Name">
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="0">Main Category List</Option>
            {categorys.map((item) => (
              <Option value={item._id}>{item.name}</Option>
            ))}
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
