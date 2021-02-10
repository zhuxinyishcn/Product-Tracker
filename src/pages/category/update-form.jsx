import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
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
    const { categoryName } = this.props;

    return (
      <Form onFinish={this.onFinish} ref={this.formRef}>
        <Form.Item
          name="changedName"
          label="New Category Name"
          initialValue={""}
        >
          <Input placeholder={categoryName} />
        </Form.Item>
        <Button htmlType="button" onClick={this.onReset}>
          Reset
        </Button>
      </Form>
    );
  }
}
