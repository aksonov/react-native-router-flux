import { connect } from 'react-redux';

class StateManager {
  stateChangeHandler = null;
  reducer = null;
  reduxDispatch = null;

  constructor(dispatch) {
    this.reduxDispatch = dispatch;
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

function createEngine(dispatch) {
  stateManagerInstance = new StateManager(dispatch);

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
  const newState = stateManagerInstance !== null && typeof stateManagerInstance.reducer === 'function' ? stateManagerInstance.reducer(!state || state.index === undefined ? null : state, cmd) : null;

  if (!newState) return state || {};

  setTimeout(function getOuttaHere() { stateManagerInstance.stateChangeHandler(newState); });

  return newState;
}

export default createEngine;
