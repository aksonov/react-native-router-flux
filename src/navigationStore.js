import { observable, action, autorunAsync, computed, toJS } from 'mobx';
import { NavigationActions } from 'react-navigation';
import * as ActionConst from './ActionConst';
import { OnEnter, OnExit } from './Util';

export const ActionMap = {
  jump: ActionConst.JUMP,
  push: ActionConst.PUSH,
  replace: ActionConst.REPLACE,
  back: ActionConst.BACK,
  BackAction: ActionConst.BACK_ACTION,
  popAndReplace: ActionConst.POP_AND_REPLACE,
  popTo: ActionConst.POP_TO,
  refresh: ActionConst.REFRESH,
  reset: ActionConst.RESET,
  focus: ActionConst.FOCUS,
  pushOrPop: ActionConst.PUSH_OR_POP,
  androidBack: ActionConst.ANDROID_BACK,
  [ActionConst.JUMP]: ActionConst.JUMP,
  [ActionConst.PUSH]: ActionConst.PUSH,
  [ActionConst.REPLACE]: ActionConst.REPLACE,
  [ActionConst.BACK]: ActionConst.BACK,
  [ActionConst.BACK_ACTION]: ActionConst.BACK_ACTION,
  [ActionConst.POP_AND_REPLACE]: ActionConst.POP_AND_REPLACE,
  [ActionConst.POP_TO]: ActionConst.POP_TO,
  [ActionConst.REFRESH]: ActionConst.REFRESH,
  [ActionConst.RESET]: ActionConst.RESET,
  [ActionConst.FOCUS]: ActionConst.FOCUS,
  [ActionConst.PUSH_OR_POP]: ActionConst.PUSH_OR_POP,
  [ActionConst.ANDROID_BACK]: ActionConst.ANDROID_BACK,
};

export const supportedActions = {
  [ActionConst.PUSH]: NavigationActions.NAVIGATE,
  [ActionConst.JUMP]: NavigationActions.NAVIGATE,
  [ActionConst.REPLACE]: NavigationActions.RESET,
  [ActionConst.BACK]: NavigationActions.BACK,
  [ActionConst.REFRESH]: NavigationActions.BACK,
  [ActionConst.RESET]: NavigationActions.RESET,
};
function filterParam(data) {
  if (data.toString() !== '[object Object]') {
    return { data };
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

  constructor() {
    const defaultSuccess = () => {};
    const defaultFailure = () => {};

    autorunAsync(async () => {
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
            } catch (e) {
              console.error('Error during onExit handler:', e);
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
              console.log('RUN onEnter handler for state=', this.currentScene, ` params=${JSON.stringify(params)}`);
              const res = await handler(params);
              if (res) {
                console.log('SUCCESS', res);
                success(res);
              } else {
                console.log('FAILURE NULL RES');
                failure();
              }
            } catch (e) {
              console.log('FAILURE EXCEPTION', e);
              failure(e);
            }
          }
        }
      } catch (e) {
        console.error(`Error handling:${e}`);
      }
    });
  }

  nextState = (state, cmd) => (this.reducer ? this.reducer(state, cmd) : this._router.getStateForAction(cmd, state));

  dispatch = (cmd) => {
    this.setState(this.nextState(this.state, cmd));
  };

  @action setState = (newState) => {
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
        res = { ...res, ...filterParam(param) };
      }
    }
    res.routeName = routeName;
    if (supportedActions[type]) {
      this.dispatch(createAction(supportedActions[type])({ routeName, index: 0, actions, params: res }));
    } else if (type === ActionConst.POP_TO) {
      let nextScene = '';
      let newState = this._state;
      let currentState = this._state;
      const currentScene = this.currentScene;
      while (nextScene !== currentScene && newState && nextScene !== routeName) {
        newState = this.nextState(currentState, NavigationActions.back());
        if (newState) {
          nextScene = this.currentState(newState).routeName;
          if (nextScene !== routeName) {
            currentState = newState;
          }
        }
      }
      if (nextScene === routeName) {
        this.setState(newState);
      }
    }
  };

  push = (routeName, ...params) => {
    this.run(ActionConst.PUSH, routeName, null, ...params);
  };

  drawerOpen = () => {
    this.dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }));
  };

  drawerClose = () => {
    this.dispatch(NavigationActions.navigate({ routeName: 'DrawerClose' }));
  };

  currentState = (param) => {
    let state = param;
    if (!state) {
      state = this._state;
    }
    if (!state.routes) {
      return state;
    }
    return this.currentState(state.routes[state.index]);
  };

  refresh = (params) => {
    const key = this.currentState(this.state).key;
    this.dispatch(NavigationActions.setParams({ key, params }));
  };

  pop = () => {
    this.dispatch(NavigationActions.back());
  };

  reset = (routeName, ...params) => {
    this.replace(routeName, ...params);
  };

  popTo = (routeName, ...params) => {
    this.run(ActionConst.POP_TO, routeName, ...params);
  };

  replace = (routeName, ...params) => {
    let res = {};
    for (const param of params) {
      if (param) {
        res = { ...res, ...filterParam(param) };
      }
    }
    res.routeName = routeName;
    this.run(ActionConst.REPLACE, routeName, [NavigationActions.navigate({
      routeName,
      params: res,
    })]);
  }
}


export default new NavigationStore();
