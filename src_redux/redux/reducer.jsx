/**
 * reducer module: use state and action to return a new state
 */
import { INCREMENT, DECREMENT } from "./action-types";

export default function count(state = 1, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data;
    case DECREMENT:
      return state - action.data;
    default:
      return state;
  }
}
