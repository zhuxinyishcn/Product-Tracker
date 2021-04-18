/**
 * This a module handle all requests based on all api call
 *
 */
import ajax from "./ajax";
import jsonp from "jsonp";
import { message } from "antd";
// a function to login
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

// a function to add a user to backend
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");

// a function to request a weather data ()
export const reqWeather = (city) => {
  const url = `some-weather-url=${city}+lol`;
  // send jsonp request
  jsonp(url, {}, (err, data) => {
    return new Promise((resolve, reject) => {
      // if we have a error message
      if (err) message.error(err);
      // if we successful get the data from api
      if (!err && data.status === "success") {
        const { weatherPicture, weather } = data.results[0].weather_data[0];
        resolve(weatherPicture, weather);
      }
    });
  });
};

// a function get tier 1 / tier 2 list from category
export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId });

// a function to add Categorys to the list
export const reqAddCategory = ({ parentId, categoryName }) =>
  ajax("/manage/category/add", { parentId, categoryName }, "POST");

// a function to modify Categorys to the list
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");

// a function to get a list of item from a certain page number
export const reqProductList = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });

// a function to get a list of item from a certain page number using a search name searchType: productName/productDescription
export const reqSearchProduct = (pageNum, pageSize, searchName, searchType) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

// a function to get the category from backend use category id
export const reqCategoryName = (categoryId) =>
  ajax("/manage/category/info", { categoryId });

// a function to update the product status though product id
export const reqUpdateStatus = (productId, status) =>
  ajax("/manage/product/updateStatus", { productId, status }, "POST");

// a function take image name and delete send a image delete request.
export const reqDeleteImg = (name) =>
  ajax("/manage/img/delete", { name }, "POST");

// This is a function that take product object to add / update a product in the backend
export const reqAddOrUpdateProduct = (product) =>
  ajax("/manage/product/" + (product._id ? "update" : "add"), product, "POST");

// This is a  function that send a request to the list of roles
export const reqRoles = () => ajax("/manage/role/list");

// This is a  function that send a request to the add a role
export const reqAddRoles = (roleName) =>
  ajax("/manage/role/add", { roleName }, "POST");

// This is a  function that send a request to the update a role
export const reqUpdateRoles = (role) =>
  ajax("/manage/role/update", role, "POST");
