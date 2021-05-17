import React, { useImperativeHandle, forwardRef } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

// This react hook use different way to use React.forwardRef
const WrappedForm = forwardRef(({ roles, user }, ref) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  useImperativeHandle(ref, () => ({
    // This is a form instance for parrent component to access
    formInstance: form,
  }));

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}>
      <Form.Item
        label="Username"
        name="username"
        initialValue={user.username}
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      {!user._id && (
        <Form.Item
          label="Password"
          name="password"
          initialValue={user.password}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
      )}
      <Form.Item label="Phone" name="phone" initialValue={user.phone}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" initialValue={user.email}>
        <Input />
      </Form.Item>
      <Form.Item label="Role" name="role_id" initialValue={user.role_id}>
        <Select
          showSearch
          placeholder="Select a role"
          optionFilterProp="value"
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {roles.map((role) => (
            <Option value={role._id} key={role._id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

WrappedForm.propTypes = {
  roles: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default WrappedForm;
