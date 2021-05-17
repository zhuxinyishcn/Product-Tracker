import { Component } from "React";
import PropTypes from "prop-types";
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };
  static childContextTypes;
  render() {
    return this.props.children;
  }
}

/**
 * connect advance function: take mapStateToProps and mapDispatchToProps two parameter
 * return advance function
 */
export function connect(mapStateToProps, mapDispatchToProps) {
  return (UIComponent) => {
    // return ContainerComponent component
    return class ContainerComponent extends Component {
      // get the global context name and types
      static contextTypes = {
        store: PropTypes.object,
      };
      constructor(props, context) {
        super(props);
        const { store } = context;
        // get store and call function to apply to current state
        const stateProps = mapStateToProps(store.getState());
        this.state = { ...stateProps };
        let dispatchProps;
        if (typeof mapStateToProps !== "function") {
          Object.keys(mapDispatchToProps).reduce((prev, key) => {
            const actionCreator = mapDispatchToProps[key];
            // Functions Rest Parameters, collect all parameter
            prev[key] = (...args) => {
              // spread the args array
              store.dispatch(actionCreator(...args));
            };
            return prev;
          }, {});
        }

        // get all object contain all function
        if (typeof mapStateToProps === "function")
          dispatchProps = mapDispatchToProps(store.dispatch);
        this.dispatchProps = dispatchProps;
        // store state subsribe update
        store.subscribe(() => {
          // store internal state update ==> update UI component
          // use mapStateToProps get specific state
          this.state({ ...mapDispatchToProps(store.getState()) });
        });
      }
      render() {
        // return UI component tag
        return <UIComponent {...this.state} {...this.dispatchProps}></UIComponent>;
      }
    };
  };
}
