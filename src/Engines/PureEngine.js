import React, { Component } from 'react';
import PropTypes from 'prop-types';

function WrapState(RouterComponent) {
  return class extends Component {
    static propTypes = {
      children: PropTypes.any,
    }

    constructor(...args) {
      super(...args);

      this.state = {
        navigationState: null,
      };

      stateManagerInstance.setupStateManager(this.getState, this.dispatch);
    }

    componentDidMount() {
      stateManagerInstance.emptyQueue();
    }

    getState = () => this.state.navigationState;

    dispatch = (action) => {
      const newState = stateManagerInstance.reducer(this.state.navigationState, action);

      if (!newState) return;

      stateManagerInstance.stateChangeHandler(newState);

      this.setState({
        navigationState: newState,
      });
    }

    render() {
      if (!this.state.navigationState) return null;

      return <RouterComponent {...this.props} />;
    }
  };
}

class StateManager {
  getState = null;
  internalDispatch = null;

  reducer = null;
  stateChangeHandler = null;

  queue = [];
  queueEmptied = false;

  setupStateManager(getStateFunc, dispatchFunc) {
    this.getState = getStateFunc;
    this.internalDispatch = dispatchFunc;
  }

  emptyQueue() {
    this.queueEmptied = true;

    for (const action of this.queue) {
      this.dispatch(action);
    }
  }

  dispatch = (action) => {
    if (this.internalDispatch && this.queueEmptied) {
      this.internalDispatch(action);
    } else {
      this.queue.push(action);
    }
  }

  setupHandlers = (reducer, setChangedHandler) => {
    this.reducer = reducer;
    this.stateChangeHandler = setChangedHandler;
  }
}

const stateManagerInstance = new StateManager();

export default {
  appHoc: WrapState,
  stateManager: stateManagerInstance,
};
