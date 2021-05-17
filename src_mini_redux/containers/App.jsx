import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increment, decrement, incrementAsync } from "../redux/actions";
/*
 * container component
 * connect() : advance function
 * connect() : return a advacne component: take an UI component, generate a container
 * component
 * container component responsible: give special arrtibute to UI component
 **/
/**
 * @description: This is function that redux store state map to general attribute function
 * @param {*} state
 * @return {*}
 */
function mapStateToProps(state) {
  return { count: state };
}

/**
 * @description: This is a function that dispatch code function  map to UI component function attribute
 * @param {*} dispatch
 * @return {*}
 */
function mapDispatchToProps(dispatch) {
  return {
    increment: (number) => dispatch(increment(number)),
    decrement: (number) => dispatch(decrement(number)),
  };
}

export default connect((state) => ({ count: state.count }), {
  increment,
  decrement,
  incrementAsync,
})(Counter);

/**
 * This is a simple way to connect the component
 * export default connect(mapStateToProps, mapDispatchToProps)(Counter);
 */
