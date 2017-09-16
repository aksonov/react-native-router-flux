import { connect } from 'react-redux';

class StateManager {
  stateChangeHandler = null;
  reducer = null;
  reduxDispatch = null;

  constructor(store) {
    this.reduxDispatch = store.dispatch;
  }

  getState(props) {
    return props.state;
  }

  setupHandlers = (reducer, setChangedHandler) => {
    this.reducer = reducer;
    this.stateChangeHandler = setChangedHandler;
  }

  dispatch = (cmd) => {
    this.reduxDispatch(cmd);
  }
}

let stateManagerInstance = null;

function createEngine(store) {
  stateManagerInstance = new StateManager(store);

  return {
    appHoc: connect(mapStateToProps),
    stateManager: stateManagerInstance,
  };
}

function mapStateToProps(state) {
  return {
    state: state.nav,
  };
}

export function navReducer(state, cmd) {
  const newState =
    stateManagerInstance !== null && typeof stateManagerInstance.reducer === 'function'
      ? stateManagerInstance.reducer(!state || state.index === undefined ? null : state, cmd) :
      null;

  if (!newState) return state || {};

  return newState;
}

export function navMiddleware({ getState }) {
  return (next) => (action) => {
    const result = next(action);

    stateManagerInstance.stateChangeHandler(getState());

    return result;
  };
}

export default createEngine;
