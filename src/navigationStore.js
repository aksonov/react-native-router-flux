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
  states = {};
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
    console.log("CREATE NAVIGATION STORE");
    const defaultSuccess = () => {};
    const defaultFailure = () => {};

    autorun(()=>{
      try {
        if (this.prevScene && this.currentScene !== this.prevScene) {
          // call onExit handler
          const handler = this[this.prevScene + OnExit];
          if (handler) {
            try {
              console.log("RUN onExit handler for state=",this.prevScene);
              const res = handler();
              if (res instanceof Promise) {
                res.then(defaultSuccess, defaultFailure);
              }
            } catch (e){
              console.error("Error during onExit handler:", e);
            }
          }
        }
        if (this.currentScene && this.currentScene !== this.prevScene) {
          console.log("CURRENT SCENE:", this.currentScene, " PREV SCENE:", this.prevScene);
          const handler = this[this.currentScene + OnEnter];
          const success = this.states[this.currentScene].success || defaultSuccess;
          const failure = this.states[this.currentScene].failure || defaultFailure;
          // call onEnter handler
          if (handler) {
            try {
              console.log("RUN onEnter handler for state=",this.currentScene);
              const res = handler();
              if (res instanceof Promise) {
                res.then(success, failure);
              } else {
                success(res);
              }
            } catch (e) {
              console.error("Error during onEnter handler:", e);
              failure(e);
            }

          }
        }
      } catch (e) {
        console.error("Error handling:" + e);

      }
    });
  }

  dispatch(action) {
    const newState = this._router.getStateForAction(action, this.state);
    this._state = newState;
    this.prevScene = this.currentScene;
    this.currentScene = this.currentState(this._state).routeName;
    console.log("ACTION:", action.routeName);
    console.log("CHANGE STATE:", JSON.stringify(this.state));
  }

  push(routeName, params = {}) {
    this.dispatch(NavigationActions.navigate({routeName, params: filterParam(params)}));
  }

  currentState(state) {
    if (!state) {
      state = this._state;
      if (!this._state) {
        console.log("NULL STATE!!!!!!!!!!!!!");
      }
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
