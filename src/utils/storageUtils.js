/**
 * This is a moduele to store user to local storage
 *
 */
import store from "store";
const USER_KEY = "user_key";
export default {
  /**
   * @description: save a user to store
   * @param {*} user
   *
   */
  saveUser(user) {
    store.set(USER_KEY, user);
  },
  /**
   * @description: get user from store
   * @param {*} none
   * @return {*} return a user json string, if we cannot find the user, return a empty json
   */
  getUser() {
    return store.get(USER_KEY) || {};
    /**
     * @description: remove a user from local store
     * @param {*}
     * @return {*}
     */
  },
  removeUser() {
    store.remove(USER_KEY);
  },
};
