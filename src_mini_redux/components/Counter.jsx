import React, { Component } from "react";
import PropTypes from "prop-types";
/*
 *UI组件
 * mainly to interact with user
 * does not have any redux code
 **/
export default class App extends Component {
  static propTypes = {
    counter: PropTypes.object.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.numberRef = React.createRef();
  }
  increment = () => {
    const number = this.numberRef.current.value * 1;
    this.props.increment(number);
  };
  decrement = () => {
    const number = this.numberRef.current.value * 1;
    this.props.decrement(number);
  };
  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1;
    const count = this.props.count;
    if (count % 2 === 1) {
      this.props.increment(number);
    }
  };
  incrementAsync = () => {
    const number = this.numberRef.current.value * 1;
    this.props.incrementAsync(number);
  };
  render() {
    const count = this.props.count;
    return (
      <div>
        <p>click {count}</p>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          &nbsp;
          <button onClick={this.increment}>+</button>&nbsp;
          <button onClick={this.decrement}>-</button>&nbsp;
          <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
          <button onClick={this.incrementAsync}>increment async</button>
        </div>
      </div>
    );
  }
}
