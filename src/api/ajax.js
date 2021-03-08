/**
 * This is a module to send a ajax request to axios library
 *
 * return value is a promise
 * handle all exception from axios
 */
import axios from "axios";
import { message } from "antd";
/**
 * @description: This is a function return a new promise and handling all potenial exception
 * @param {*} url
 * @param {*} data
 * @param {*} type
 * @return {*} a js promise (reponse) data
 */
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    // This is a axioPromise to store the axioPromise promise
    let axioPromise;
    /*
     * 1. execute ajax request
     */
    // GET request
    if (type === "GET") axioPromise = axios.get(url, { params: data });
    // POST request
    if (type === "POST") axioPromise = axios.post(url, data);
    axioPromise
      .then((response) => {
        // if we success execute the requestm we use resolve
        resolve(response.data);
      })
      // insead of using reject(), if enconter a exception, we prompt a error message to inform user
      .catch((reason) => {
        message.error(
          "Sorry, we cannot execute this request: " + reason.message
        );
      });
  });
}
