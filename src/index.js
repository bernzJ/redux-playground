import React, { Component } from "react";
import { render } from "react-dom";
import { createStore, combineReducers, bindActionCreators } from "redux";
import { connect, Provider } from "react-redux";

const TYPES = {
  INC: "INC",
  DEC: "DEC"
};
const initialState = { count: 0 };
// Question, Is this correct ? Or should I split this into an other function (count is undefined when the action is dispatched)
const increase = ({ count } = initialState) => {
  return { type: TYPES.INC, count: count + 1 };
};
const decrease = ({ count }) => ({ count: count - 1, type: TYPES.DEC });

const ACTION_MAP = {
  [TYPES.INC]: increase,
  [TYPES.DEC]: decrease
};

const countReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const actionFunc = ACTION_MAP[type];
  if (actionFunc) return actionFunc(state, payload);
  return state;
};

const reducers = combineReducers({
  counter: countReducer
});

const store = createStore(reducers);

class App extends Component {
  render() {
    const {
      increase,
      decrease,
      counter: { count }
    } = this.props;
    return (
      <div>
        <button onClick={() => increase()}>Increment</button>
        <button onClick={decrease}>Decrement</button>
        <div>Value: {count}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ counter }) => {
  return { counter };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    increase,
    decrease
  };
  return bindActionCreators(actions, dispatch);
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
