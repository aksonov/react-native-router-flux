import { observable, action } from 'mobx';
import { observer } from 'mobx-react/native';

class StateManager {
  stateChangeHandler = null;
  reducer = null;
  getActiveState = null;

  _state;
  @observable currentScene = '';
  @observable prevScene = '';
  @observable currentParams;

  get state() {
    const scene = this.currentScene; // eslint-disable-line no-unused-vars
    const params = this.currentParams; // eslint-disable-line no-unused-vars
    return this._state;
  }

  getState = () => this.state;

  setupHandlers = (reducer, setChangedHandler, getActiveState) => {
    this.reducer = reducer;
    this.stateChangeHandler = setChangedHandler;
    this.getActiveState = getActiveState;
  }

  dispatch = (cmd) => {
    const newState = this.reducer(this._state, cmd);
    const activeState = this.getActiveState(newState);

    if (!newState) return;

    this._state = newState;
    this.currentScene = activeState.routeName;
    this.currentParams = activeState.params;

    this.stateChangeHandler(newState);
  }
}

export default {
  appHoc: observer,
  stateManager: new StateManager(),
};
