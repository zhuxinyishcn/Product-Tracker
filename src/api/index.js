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
