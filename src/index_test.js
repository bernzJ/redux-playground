import React, { Component } from "react";
import { render } from "react-dom";
import { createStore, combineReducers, bindActionCreators } from "redux";
import { connect, Provider } from "react-redux";
import "./style.css";

const TYPES = {
  INC: "INC",
  DEC: "DEC"
};

/*const countReducer = (state = { payload: 0 }, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.INC: {
      return actions.inc(state, payload);
    }
    case TYPES.DEC:
      return { count: state.count - 1 };
    default:
      return state;
  }
};*/

const increase = (state, i) => {
  //console.log(state, payload, "***action");
  return { ...state, type: TYPES.INC, payload: i };
};
const decrease = count => ({ payload: count - 1, type: TYPES.DEC });

const ACTION_MAP = {
  [TYPES.INC]: increase,
  [TYPES.DEC]: decrease
};

const countReducer = (state = { payload: 0 }, action) => {
  const { type, payload } = action;
  const actionFunc = ACTION_MAP[type];
  if (actionFunc) {
    console.log(action);
    return actionFunc(state, payload);
  }
  return state;
};

/*const actions = {
  inc: (state, i) => ({ ...state, type: "INC", payload: i }),
  dec: () => ({ type: "DEC" })
};*/

const reducers = combineReducers({
  counter: countReducer
});
const store = createStore(reducers);

class App extends Component {
  render() {
    const { increase, decrease, counter } = this.props;
    console.log(counter, "***view");
    return (
      <div>
        <button
          onClick={() => {
            // This looks weird, is this ok?
            increase(null, counter.payload + 1);
          }}
        >
          Increment
        </button>
        <button onClick={decrease}>Decrement</button>
        <div>Value: {counter.payload}</div>
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
