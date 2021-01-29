import React, { Component } from "react";
import "./index.less";
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>welcom, admin</span>
          <a href="javascript:">Logout</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">Home</div>
          <div className="header-bottom-right">
            <span>2020-01-27 10:52</span>
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
