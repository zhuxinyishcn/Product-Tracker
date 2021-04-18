import React, { useImperativeHandle, forwardRef } from "react";
import { Form, Button, Input } from "antd";

// This react hook use different way to use React.forwardRef
function AddForm(props, ref) {
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    formInstance: form,
  }));

  return (
    <Form form={form}>
      <Form.Item
        name="roleName"
        label="Role Name"
        rules={[{ required: true, message: "Please input your Role Name!" }]}
      >
        <Input placeholder="Please Input Role Name" />
      </Form.Item>
      <Button
        htmlType="button"
        onClick={() => {
          form.resetFields();
        }}
      >
        Reset
      </Button>
    </Form>
  );
}
const WrappedForm = forwardRef(AddForm);
export default WrappedForm;
