import { Button, message } from "antd";
import React, { Component } from "react";

export default class App extends Component {
  handleClick = () => {
    message.success("heelo, would");
  };
  render() {
    return (
      <Button type="primary" onClick={this.handleClick}>
        小老板
      </Button>
    );
  }
}
