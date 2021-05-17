/**
 * @description: This is main module for customize redux
 * @param {*} reducer
 * @return {*}
 */
export function createStore(reducer) {
  let state = reducer(undefined, { type: "redux@@init" });
  const listeners = [];
  // return current store
  function getStore() {
    return state;
  }
  // dispatch actions, use reducer, generate new state
  function dispatch(action) {
    // 1. call reducer, get a new state
    const newState = reducer(state, action);
    // 2. save new state
    state = newState;
    // 3. call all listeners in the list
    listeners.forEach((listen) => listen());
  }
  // internal state callback function
  function subscribe(listener) {
    // attach to listeners list
    listeners.push(listener);
  }
  return { getStore, dispatch, subscribe };
}

/**
 * passing many parameter reducer function, return a new reducer
 * new reducer state: {r1: state1, r2: state2}
 */
export function combineReducers(reducers) {
  return (state = {}, action) => {
    const totalState = {};
    Object.keys(reducers).forEach((key) => {
      totalState[key] = reducers(state[key], action);
    });
    return totalState;
  };
  // This is a way use reducer to update the total state
  // return (state = {}, action) => {
  //   return Object.keys(reducers).reduce((totalState, key) => {
  //     totalState[key] = reducers[key](state[key], action);
  //     return totalState;
  //   }, {});
  // };
}
