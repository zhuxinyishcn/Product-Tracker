/**
 * reducer module: use state and action to return a new state
 */
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG } from "./action-types";
import { combineReducers } from "redux";
import storageUtils from "../utils/storageUtils";

const initHeadTitle = "Home";
function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data;
    default:
      return state;
  }
}

const initUser = storageUtils.getUser();

function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.data;
    case SHOW_ERROR_MSG:
      // do not mofidy orginal state
      return { ...state, errorMsg: action.errorMsg };
    default:
      return state;
  }
}

export default combineReducers({ headTitle, user });
