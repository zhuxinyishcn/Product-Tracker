import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";
// read user from local storage
const user = storageUtils.getUser();
memoryUtils.user = user;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
