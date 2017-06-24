import {observable, autorun, computed, toJS} from 'mobx';
import autobind from 'autobind-decorator';
import {NavigationActions} from 'react-navigation';
import {OnEnter, OnExit} from './Util';

function filterParam(data) {
  if (data.toString() !== '[object Object]') {
    return {data};
  }
  const proto = (data || {}).constructor.name;
  // avoid passing React Native parameters
  if (!data || (proto !== 'Object')) {
    return {};
  }
  return data;
}

@autobind
class NavigationStore {
  _router = null;
  @observable _state;
  @observable currentScene = '';
  @observable prevScene = '';
  @computed get state() {
    return toJS(this._state);
  }

  set router(router) {
    this._router = router;
    this.dispatch(NavigationActions.init());
  }
  get router() {
    return this._router;
  }

  constructor(){
    autorun(()=>{
      try {
        if (this.prevScene && this.currentScene !== this.prevScene) {
          // call onExit handler
          if (this[this.prevScene + OnExit]) {
            this[this.prevScene + OnExit]();
          }
        }
        if (this.currentScene && this.currentScene !== this.prevScene) {
          // call onEnter handler
          if (this[this.currentScene + OnEnter]) {
            this[this.currentScene + OnEnter]();
          }
        }
      } catch (e) {
        console.error("Error handling:" + e);

      }
    });
  }

  dispatch(action) {
    this._state = this._router.getStateForAction(action, this._state);
    this.prevScene = this.currentScene;
    this.currentScene = this.currentState(this._state).routeName;
  }

  push(routeName, params) {
    this.dispatch(NavigationActions.navigate({routeName, params: filterParam(params)}));
  }

  currentState(state) {
    if (!state) {
      state = this._state;
    }
    if (!state.routes) {
      return state;
    } else {
      return this.currentState(state.routes[state.index]);
    }
  }

  refresh(params) {
    const key = this.currentState(this.state).key;
    this.dispatch(NavigationActions.setParams({key, params}));
  }

  pop() {
    this.dispatch(NavigationActions.back());
  }
}


export default new NavigationStore();
