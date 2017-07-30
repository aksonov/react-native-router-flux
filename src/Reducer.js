import navigationStore from './navigationStore';
import * as ActionConst from './ActionConst';
import { NavigationActions } from 'react-navigation';
import { getActiveState } from './State';

export const supportedActions = {
  [ActionConst.PUSH]: NavigationActions.NAVIGATE,
  [ActionConst.BACK]: NavigationActions.BACK,
  [ActionConst.REFRESH]: NavigationActions.BACK,
  [ActionConst.RESET]: NavigationActions.RESET,
  [ActionConst.REPLACE]: NavigationActions.RESET,
};

const createAction = (type: string) => (payload: Object = {}) => ({
  type,
  ...payload,
});


export function reducer(state = navigationStore.state, action) {
  const type = action.type;
  const routeName = action.routeName;
  if (supportedActions[type]) {
    const newState = navigationStore.router.getStateForAction(createAction(supportedActions[type])({
      routeName,
      params: action.params,
    }), state);
    const newActiveState = getActiveState(newState);
    const activeState = getActiveState(state);
    if (type === ActionConst.JUMP && newActiveState.routeName === activeState.routeName) {
      return state;
    }
    return newState || state;
  }
  if (type === ActionConst.JUMP) {
    const newState = navigationStore.router.getStateForAction(NavigationActions.navigate({ routeName, params: action.params }), state);
    const key = getActiveState(newState).key;
    return navigationStore.router.getStateForAction(NavigationActions.setParams({
      key,
      params: action.params,
    }), newState);
  } else if (type === ActionConst.POP_TO) {
    let nextScene = '';
    let newState = state;
    let currentState = state;
    const currentScene = getActiveState(state).routeName;
    while (nextScene !== currentScene && newState && nextScene !== routeName) {
      newState = navigationStore.router.getStateForAction(NavigationActions.back(), currentState);
      if (newState) {
        nextScene = getActiveState(newState).routeName;
        if (nextScene !== routeName) {
          currentState = newState;
        }
      }
    }
    return nextScene === routeName ? newState : state;
  } else if (type === ActionConst.POP_AND_PUSH) {
    const newState = navigationStore.router.getStateForAction(NavigationActions.back(), state);
    return navigationStore.router.getStateForAction(NavigationActions.navigate({
      routeName,
      params: action.params,
    }), newState);
  }
  return navigationStore.router.getStateForAction(action, state) || state;
}

export default function createReducer() {
  return reducer;
}
