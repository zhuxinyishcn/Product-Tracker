import React, { Component } from "react";
import "./index.less";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import LinkButtom from "../link-buttom/index";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { formateDate } from "../../utils/dateUtils";
import { withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";

const { confirm } = Modal;

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
  };

  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 60000);
  };
  /**
   * @description: a function get the title form the path
   * @param {*} getTitle
   * @return {*}
   */
  // getTitle = () => {
  //   // get path value from location value
  //   const path = this.props.location.pathname;
  //   menuList.forEach((item) => {
  //     // if we find the titel is in the main menu instead of sub menu, direct to that title
  //     if (item.key === path) return item.title;
  //     // check all sub item in the children
  //     if (item.children) {
  //       // check all item
  //       const cItem = item.children.find((cItem) => cItem.key === path);
  //       // if we find it did have the item, we get he title from it
  //       if (cItem) return cItem.title;
  //     }
  //   });
  // };
  getTitle = () => {
    // get path value from location value
    const path = this.props.location.pathname;
    let title;
    menuList.forEach((item) => {
      // if we find the titel is in the main menu instead of sub menu, direct to that title
      if (item.key === path) title = item.title;
      // check all sub item in the children
      if (item.children) {
        // check all item
        const cItem = item.children.find((cItem) => cItem.key === path);
        // if we find it did have the item, we get he title from it
        if (cItem) title = cItem.title;
      }
    });
    return title;
  };
  /**
   * @description: a function help user to logout, clear all user storage
   * @param {*} logout
   * @return {*}
   */
  logout = () => {
    confirm({
      title: "Do you Want to Logout ?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        // delete user data from localmemory
        memoryUtils.user = {};
        // delete user dara from local store
        storageUtils.removeUser();
        // redirect to login page
        this.props.history.replace("/login");
      },
    });
  };

  // execute after first render
  componentDidMount() {
    this.getTime();
  }

  // before close this component, close the interval prevent memory leak
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  /**
   * we can not do this, because will mount only execute after first time
   */
  // componentWillMount() {
  //   // get current title
  //   this.title = this.getTitle();
  // }
  render() {
    const { currentTime } = this.state;
    const username = memoryUtils.user.username;
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>welcom, {username}</span>
          <LinkButtom onClick={this.logout}>Logout</LinkButtom>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt="weather"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
