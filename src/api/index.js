/**
 * This a module handle all requests based on all api call
 *
 */
import ajax from "./ajax";
// a function to login
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");
// a function to add a user to backend
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");
