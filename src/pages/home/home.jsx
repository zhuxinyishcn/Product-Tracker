import React, { Component } from "react";
import { Icon, Card, DatePicker, Timeline, Statistic, Row, Col } from "antd";
import moment from "moment";
import Line from "./line";
import Bar from "./bar";
import "./home.less";
import { LikeOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
const dateFormat = "YYYY/MM/DD";
const { RangePicker } = DatePicker;
export default class Home extends Component {
  state = {
    isVisited: true,
  };
  handleChange = (isVisited) => {
    return () => this.setState({ isVisited });
  };
  render() {
    const { isVisited } = this.state;
    return (
      <div className="home">
        <Card
          className="home-card"
          headStyle={{ color: "rgba(0,0,0,.45)" }}
          bodyStyle={{ padding: 0, height: 575 }}
        >
          <Card className="home-card-content" bordered={false}>
            <Row gutter={16}>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Row>
            <span>
              <Statistic title="Active Users" value={112893} />
              <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
            </span>
          </Card>

          <Line className="chart" />
        </Card>
        <Card
          className="home-content"
          title={
            <div className="home-menu">
              <span
                className={isVisited ? "home-menu-active home-menu-visited" : "home-menu-visited"}
                onClick={this.handleChange(true)}
              >
                Total Amount
              </span>
              <span
                className={isVisited ? "" : "home-menu-active"}
                onClick={this.handleChange(false)}
              >
                Sales Amount
              </span>
            </div>
          }
          extra={
            <RangePicker
              defaultValue={[moment("2021/11/11", dateFormat), moment("2020/11/11", dateFormat)]}
              format={dateFormat}
            />
          }
        >
          <Card
            className="home-table-left"
            title={isVisited ? "Visit Trend" : "Sales Trend"}
            bodyStyle={{ padding: 0, height: 275 }}
            extra={<Icon type="reload" />}
          >
            <Bar />
          </Card>
          <Card title="Tasks" extra={<Icon type="reload" />} className="home-table-right">
            <Timeline>
              <Timeline.Item color="green">New version iteration meeting</Timeline.Item>
              <Timeline.Item color="green">The first version of the website design</Timeline.Item>
              <Timeline.Item color="red">
                <p>Interface Design</p>
                <p>Feature Acceptance Meeting</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Login function design</p>
                <p>Permission Validation</p>
                <p>Page layout</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    );
  }
}
