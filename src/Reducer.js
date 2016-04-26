/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { PUSH_ACTION, POP_ACTION2, JUMP_ACTION, INIT_ACTION, REPLACE_ACTION, RESET_ACTION, POP_ACTION, REFRESH_ACTION } from './Actions';
import assert from 'assert';
import { getInitialState } from './State';

const checkPropertiesEqual = (action, lastAction) => {
  let isEqual = true;
  for (let i in action) {
    if (action.hasOwnProperty(i) && ['key', 'type', 'parent'].indexOf(i) == -1) { // property is passed as argument
      if (action[i] != lastAction[i]) {
        isEqual = false;
      }
    }
  }

  return isEqual;

};

function inject(state, action, props, scenes) {
  const condition = action.type == REFRESH_ACTION ? state.key === props.key || state.sceneKey === action.key : state.sceneKey == props.parent;
  //console.log("INJECT:", action.key, state.sceneKey, condition);
  if (!condition) {
    if (state.children) {
      let res = state.children.map(el => inject(el, action, props, scenes));
      let changed = false;
      let changedIndex = -1;
      for (let i = 0; i < res.length; i++) {
        if (res[i] != state.children[i]) {
          changed = true;
          changedIndex = i;
          break;
        }
      }
      return changed ? { ...state, children: res, index:changedIndex } : state;
    } else {
      return state;
    }
  } else {
    switch (action.type) {
      case POP_ACTION2:
      case POP_ACTION:
        assert(!state.tabs, 'pop() operation cannot be run on tab bar (tabs=true)');
        return {
          ...state,
          index:state.index - 1,
          from: state.children[state.children.length - 1],
          children:state.children.slice(0, -1),
        };
      case REFRESH_ACTION:
        return props.base ? {navBar:state.navBar, ...props, key:state.key, from: null} : {
          ...state,
          ...props,
          key:state.key,
          from: null
        };
      case PUSH_ACTION:
        if (state.children[state.index].sceneKey == action.key && !props.clone && checkPropertiesEqual(action, state.children[state.index])) {
          return state;
        }
        return {
          ...state,
          index:state.index + 1,
          from: null,
          children:[...state.children, getInitialState(props, scenes, state.index + 1, action)]
        };
      case JUMP_ACTION:
        assert(state.tabs, 'Parent=' + state.key + ' is not tab bar, jump action is not valid');
        let ind = -1;
        state.children.forEach((c, i) => { if (c.sceneKey == action.key) { ind = i; } });
        assert(ind != -1, 'Cannot find route with key=' + action.key + ' for parent=' + state.key);
        return { ...state, index:ind };
      case REPLACE_ACTION:
        if (state.children[state.index].sceneKey == action.key) {
          return state;
        }
        return { ...state, children:[...state.children.slice(0, -1), getInitialState(props, scenes, state.index, action)] };
      case RESET_ACTION:
        return { ...state, index:0, children:[getInitialState(props, scenes, state.index, action)] };
      default:
        return state;

    }

    return state;
  }
}


function findElement(state, key, type) {
  if ((type === REFRESH_ACTION && state.key === key) || state.sceneKey === key) {
    return state;
  }
  if (state.children) {
    for (let child of state.children) {
      let current = findElement(child, key, type);
      if (current) return current;
    }
  }
}

function getCurrent(state) {
  if (!state.children) {
    return state;
  }
  return getCurrent(state.children[state.index]);
}



function update(state, action) {
    // find parent in the state
  const props = { ...state.scenes[action.key], ...action };
  assert(props.parent, 'No parent is defined for route=' + action.key);
  return inject(state, action, props, state.scenes);
}

function reducer({ initialState, scenes }) {
  assert(initialState, 'initialState should not be null');
  assert(initialState.key, 'initialState.key should not be null');
  assert(scenes, 'scenes should not be null');
  return function (state, action) {
    state = state || { ...initialState, scenes };
    assert(action, 'action should be defined');
    assert(action.type, 'action type should be defined');
    assert(state.scenes, 'state.scenes is missed');

    if (action.key) {
      if (action.type === REFRESH_ACTION) {
        let key = action.key;
        let child = findElement(state, key, action.type) || state.scenes[key];
        let sceneKey = child.sceneKey;
        if (child.base){
          child = {...state.scenes[child.base], ...child};
          assert(state.scenes[child.base], "No scene exists for base="+child.base);
          key = state.scenes[child.base].key;
          sceneKey = state.scenes[child.base].sceneKey;
        }
        assert(child, 'missed child data for key=' + key);
        action = { ...child, ...action, sceneKey, key };
        //console.log("REFRESH ACTION:", action);
      } else {
        let scene = state.scenes[action.key];
        assert(scene, 'missed route data for key=' + action.key);
                // clone scene
        if (scene.clone) {
          action.parent = getCurrent(state).parent;
        }
      }
    } else {
            // set current route for pop action or refresh action
      if (action.type === POP_ACTION || action.type === POP_ACTION2 || action.type === REFRESH_ACTION) {
        if (!action.key && !action.parent) {
          action = { ...getCurrent(state), ...action };
        }
      }
            // recursive pop parent
      if (action.type === POP_ACTION || action.type === POP_ACTION2) {
        let parent = action.parent || state.scenes[action.key].parent;
        let el = findElement(state, parent, action.type);
        while (el.parent && (el.children.length <= 1 || el.tabs)) {
          el = findElement(state, el.parent, action.type);
          assert(el, 'Cannot find element for parent=' + el.parent + ' within current state');
        }
        action.parent = el.sceneKey;
      }

    }
    switch (action.type) {
      case POP_ACTION2:
      case POP_ACTION:
      case REFRESH_ACTION:
      case PUSH_ACTION:
      case JUMP_ACTION:
      case REPLACE_ACTION:
      case RESET_ACTION:
        //console.log("PREVIOUS STATE", state);
        const newState = update(state, action);
        //if (newState != state){
        //  console.log("NEW STATE", newState);
        //} else {
        //  console.log("STATE IS NOT CHANGED");
        //}
        return newState;

      default:
        return state;

    }
  };
}

export default reducer;
