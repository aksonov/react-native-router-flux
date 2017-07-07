import {observable, autorun, computed, toJS} from 'mobx';
import {NavigationActions} from 'react-navigation';
import ActionConst from './ActionConst';
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

const createAction = (type: string) => (payload: Object = {}) => ({
  type,
  ...payload,
});



class NavigationStore {
  _router = null;
  states = {};
  reducer = null;
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
    const defaultSuccess = () => {};
    const defaultFailure = () => {};

    autorun(()=>{
      try {
        if (this.prevScene && this.currentScene !== this.prevScene) {
          // call onExit handler
          const handler = this[this.prevScene + OnExit];
          if (handler) {
            try {
              const res = handler();
              if (res instanceof Promise) {
                res.then(defaultSuccess, defaultFailure);
              }
            } catch (e){
              console.error("Error during onExit handler:", e);
            }
          }
        }
        if (this.currentScene && this.currentScene !== this.prevScene && this.states[this.currentScene]) {
          const handler = this[this.currentScene + OnEnter];
          const success = this.states[this.currentScene].success || defaultSuccess;
          const failure = this.states[this.currentScene].failure || defaultFailure;
          // call onEnter handler
          if (handler) {
            try {
              const params = this.currentState().params;
              console.log("RUN onEnter handler for state=",this.currentScene,' params='+JSON.stringify(params));
              const res = handler(params);
              if (res instanceof Promise) {
                res.then(success, failure);
              } else {
                if (res) {
                  success(res);
                } else {
                  failure();
                }
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

  dispatch = (action) => {
    const newState = this.reducer ? this.reducer(this.state, action) : this._router.getStateForAction(action, this.state);
    // don't allow duplicated scenes or null state
    if (!newState || this.currentState(newState).routeName === this.currentScene) {
      return;
    }
    this._state = newState;
    this.prevScene = this.currentScene;
    this.currentScene = this.currentState(this._state).routeName;
  };

  run = (type = ActionConst.PUSH, routeName, actions, ...params) => {
    let res = {};
    for (const param of params) {
      if (param) {
        res = {...res, ...filterParam(param)};
      }
    }
    res.routeName = routeName;
    if (res.clone){
      console.log("STATE:", JSON.stringify(this.state));
    }
    this.dispatch(createAction(type)({routeName, index:0, actions, params: res}));
  };

  push = (routeName, ...params) => {
    this.run(ActionConst.PUSH, routeName, null, ...params);
  };

  drawerOpen = () => {
    this.dispatch(NavigationActions.navigate({routeName: 'DrawerOpen'}));
  };

  drawerClose = () => {
    this.dispatch(NavigationActions.navigate({routeName: 'DrawerClose'}));
  };

  currentState = (state) => {
    if (!state) {
      state = this._state;
    }
    if (!state.routes) {
      return state;
    } else {
      return this.currentState(state.routes[state.index]);
    }
  };

  refresh = (params) => {
    const key = this.currentState(this.state).key;
    this.dispatch(NavigationActions.setParams({key, params}));
  };

  pop = () => {
    this.dispatch(NavigationActions.back());
  };

  reset = (routeName, ...params) => {
    this.replace(routeName, ...params);
  };

  replace = (routeName, ...params) => {
    let res = {};
    for (const param of params) {
      if (param) {
        res = {...res, ...filterParam(param)};
      }
    }
    res.routeName = routeName;
    this.run(ActionConst.REPLACE, routeName, [NavigationActions.navigate({
      routeName,
      params: res
    })]);
  }
}


export default new NavigationStore();
