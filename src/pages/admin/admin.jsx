import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import NotFound from "../../not-found/not-found";
const { Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ margin: "30px", backgroundColor: "white" }}>
            <Switch>
              <Redirect exact from="/" to="/home"></Redirect>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              {/* if there is no route match, we direct display */}
              <Route component={NotFound}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
