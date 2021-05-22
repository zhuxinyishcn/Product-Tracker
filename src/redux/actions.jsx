// This is an module (actions creator factory)that contain actions
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG } from "./action-types";
import { reqLogin } from "../api";
import storageUtils from "../utils/storageUtils";
import memoryUtils from "../utils/memoryUtils";

export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle });

// receive user data action
export const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });

//  show error message
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg: errorMsg });

/*
 * Asynchronous function with redux thunk return a object
 */
export const login = (username, password) => {
  return async (dispatch) => {
    // Asynchronous function request by ajax
    const result = await reqLogin(username, password);
    // if failed, then dispatch fail action
    if (result.status === 1) {
      const msg = result.msg;
      dispatch(showErrorMsg(msg));
    }
    // if success, then dispatch success action
    if (result.status === 0) {
      const user = result.data;
      // save user to in memory
      dispatch(receiveUser(user));
      // save user to storage (local)
      memoryUtils.user = user;
      storageUtils.saveUser(user);
    }
  };
};
