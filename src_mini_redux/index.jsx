/*
入口js
*/
import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { Provider } from "react-redux";

import store from "./redux/store"; // 引入store
// 将store 传递给App 组件
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
