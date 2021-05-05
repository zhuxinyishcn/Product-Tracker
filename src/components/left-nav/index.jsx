import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import "./index.less";
import { Link, withRouter } from "react-router-dom";
import { Menu, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import menuList from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils.js";
const { SubMenu } = Menu;

class LeftNav extends Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // use menu list dynamicly generate menu list (map version)
  // const getMenuNodes = (menuList) => {
  //   return menuList.map((item) => {
  //     // the item does not have children element
  //     if (!item.children) {
  //       return (
  //         <Menu.Item key={item.key} icon={item.icon}>
  //           <Link to={item.key}></Link>
  //           {item.title}
  //         </Menu.Item>
  //       );
  //     }
  //     // the item have children element
  //     if (item.children) {
  //       return (
  //         <SubMenu key="sub1" title={item.title} icon={item.icon}>
  //           {/* resively call this function to  */}
  //           <Link to={item.key}></Link>
  //           {getMenuNodes(item.children)}
  //         </SubMenu>
  //       );
  //     }
  //   });
  // };

  // This is reduce version of display list
  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        // add item to pre <menu>
        if (!item.children) {
          pre.push(
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}></Link>
              {item.title}
            </Menu.Item>
          );
        }
        if (item.children) {
          // use path to contain current path
          const path = this.props.location.pathname;
          // use array find to find a current route children item
          const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0);
          // if we have this chilren, then we assign openkeys to fater node (which is open submenu)
          if (cItem) this.openKeys = item.key;
          // pre add <Submenu></Submenu>
          pre.push(
            <SubMenu key={item.key} title={item.title} icon={item.icon}>
              {/* resively call this function to  */}
              <Link to={item.key}></Link>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
      return pre;
    }, []);
  };
  /**
   * @description: This is a function check current item to display in the left menu leaf
   * @param {*} item
   * @return {*}
   */
  hasAuth(item) {
    /**
     * There are three different situations for the menu
     * 1. current user is admin has all authorizations
     * 2. current item is public access item that everyone can see
     * 3. current item has authorization in its role
     */
    const memuAuthorization = memoryUtils.user.role.menus;
    const username = memoryUtils.user.username;

    if (username.includes("admin") || item.isPublic || memuAuthorization.indexOf(item.key) !== -1) {
      return true;
    }
    // if item has children element
    if (item.children) {
      // we use !! to force it become boolean type
      // we check each element in item children to check if memuAuthorization contain any elemnts in the list
      return !!item.children.find((child) => memuAuthorization.indexOf(child.key) !== -1);
    }
    return false;
  }

  // before render execute, prepare data for first render()
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    // use path to contain current path
    let path = this.props.location.pathname;
    // check if the path current have /product route, if yes, we just direct to /product tab
    if (path.indexOf("/product") === 0) path = "/product";
    const openKeys = this.openKeys;
    const menuNodes = this.menuNodes;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo"></img>
          <h1>System</h1>
        </Link>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKeys]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {menuNodes}
        </Menu>
      </div>
    );
  }
}

/**
 * withRouter is an advanced component
 * wrap a non route component, return a new compoment
 * provide 3 new props: history, location, match
 */
export default withRouter(LeftNav);
