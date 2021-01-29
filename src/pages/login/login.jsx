import "./login.less";
import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import { Form, Input, Button, Checkbox, message } from "antd";
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { Redirect } from "react-router-dom";
export default class Login extends Component {
  render() {
    const onFinish = async (values) => {
      const { username, password } = values;
      const result = await reqLogin(username, password);
      // if login failed, message prompt to inform user
      if (result.status === 1) message.error(result.msg);
      if (result.status === 0) {
        message.success("Welcome Back! " + result.data.username);
        const user = result.data;
        // save user to in memory
        memoryUtils.user = user;
        // save user to storage (local)
        storageUtils.saveUser(user);
        this.props.history.replace("/");
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    // check if user login before, if not then redict to login page, other
    if (memoryUtils.user && memoryUtils.user._id)
      return <Redirect to="/"></Redirect>;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"></img>
          <h1>System</h1>
        </header>
        <section className="login-content">
          <h2>Login</h2>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              /**
               * username format
               * 1. at least have some word
               * 2. at least 4 characters
               * 3. at most 12 characters
               * 4. construct with characters, numbers or _
               */
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  min: 4,
                  message: "Please have a password at least have 4 characters!",
                },
                {
                  max: 12,
                  message: "Please have a password at most have 12 characters!",
                },
                {
                  pattern: /^[0-9A-Za-z_]+$/,
                  message:
                    "Please onstruct with characters, numbers or underscore !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              /**
               * password format
               * 1. at least have some word
               * 2. at least 4 characters
               * 3. at most 12 characters
               * 4. construct with characters, numbers or _
               */
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Please input your password!");
                    }
                    if (value.length < 4) {
                      return Promise.reject(
                        "Please have a password at least have 4 characters!"
                      );
                    }
                    if (value.length > 12) {
                      return Promise.reject(
                        "Please have a password at most have 12 characters!"
                      );
                    }
                    if (!/^[0-9A-Za-z_]+$/.test(value)) {
                      return Promise.reject(
                        "Please onstruct with characters, numbers or underscore!"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
