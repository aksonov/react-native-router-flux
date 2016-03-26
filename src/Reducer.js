/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {PUSH_ACTION, POP_ACTION2, FOCUS_ACTION, JUMP_ACTION, INIT_ACTION, REPLACE_ACTION, RESET_ACTION, POP_ACTION, REFRESH_ACTION} from './Actions';
import assert from 'assert';
import Immutable from 'immutable';
import {getInitialState} from './State';

function inject(state, action, props, scenes) {
    const condition = action.type == REFRESH_ACTION ? state.key === props.key || state.sceneKey === action.key : state.sceneKey == props.parent;
    if (!condition){
        if (state.children) {
            let res = state.children.map(el=>inject(el, action, props, scenes));
            let changed = false;
            for (let i = 0; i < res.length; i++) {
                if (res[i] != state.children[i]) {
                    changed = true;
                    break;
                }
            }
            return changed ? {...state, children: res} : state;
        } else {
            return state;
        }
    } else {
        switch (action.type) {
            case POP_ACTION2:
            case POP_ACTION:
                return {...state, index:state.index-1, children:state.children.slice(0, -1) };
            case REFRESH_ACTION:
                // use key from state.key to avoid losing the index_ prefix during refresh
                props.key = state.key;
                return {...state, ...props};
            case PUSH_ACTION:
                if (state.children[state.index].sceneKey == action.key){
                    return state;
                }
                return {...state, index:state.index+1, children:[...state.children, getInitialState(props, scenes, state.index + 1, action)]};
            case JUMP_ACTION:
                assert(state.tabs, "Parent="+state.key+" is not tab bar, jump action is not valid");
                let ind = -1;
                state.children.forEach((c,i)=>{if (c.sceneKey==action.key){ind=i}});
                assert(ind!=-1, "Cannot find route with key="+action.key+" for parent="+state.key);
                return {...state, index:ind};
            case REPLACE_ACTION:
                if (state.children[state.index].sceneKey == action.key){
                    return state;
                }
                return {...state, children:[...state.children.slice(0,-1), getInitialState(props, scenes, state.index, action)]};
            default:
                return state;

        }

        return state;
    }
}


function findElement(state, key) {
    if (state.sceneKey != key){
        if (state.children){
            let result = undefined;
            state.children.forEach(el=>{
                let res = findElement(el, key);
                if (res){
                    result = res;
                    return res;
                }
            });
            return result;
        } else {
            return false;
        }
    } else {
        return state;
    }
}

function getCurrent(state){
    if (!state.children){
        return state;
    }
    return getCurrent(state.children[state.index]);
}



function update(state,action){
    // find parent in the state
    const props = {...state.scenes[action.key], ...action};
    assert(props.parent, "No parent is defined for route="+action.key);
    return inject(state, action, props, state.scenes);
}

var _uniqPush = 0;

function reducer({initialState, scenes}){
    assert(initialState, "initialState should not be null");
    assert(initialState.key, "initialState.key should not be null");
    assert(scenes, "scenes should not be null");
    return function(state, action){
        state = state || {...initialState, scenes};
        assert(action, "action should be defined");
        assert(action.type, "action type should be defined");
        assert(state.scenes, "state.scenes is missed");

        if (action.key){
            let scene = state.scenes[action.key];
            assert(scene, "missed route data for key="+action.key);

            // clone scene
            if (action.type === PUSH_ACTION && scene.clone) {
                let uniqKey = `${_uniqPush++}$${scene.key}`;
                let clone = {...scene, key: uniqKey, sceneKey: uniqKey, parent: getCurrent(state).parent};
                state.scenes[uniqKey] = clone;
                action.key = uniqKey;
            }

        } else {
            // set current route for pop action or refresh action
            if (action.type === POP_ACTION || action.type === POP_ACTION2 || action.type === REFRESH_ACTION){
                if (!action.key && !action.parent){
                    action = {...getCurrent(state),...action};
                }
            }
            // recursive pop parent
            if (action.type === POP_ACTION || action.type === POP_ACTION2) {
                let parent = action.parent || state.scenes[action.key].parent;
                let el = findElement(state, parent);
                while (el.parent && (el.children.length <= 1 || el.tabs)) {
                    el = findElement(state, el.parent);
                    assert(el, "Cannot find element for parent=" + el.parent + " within current state");
                }
                action.parent = el.sceneKey;
            }

            // remove if clone
            if (action.clone && action.sceneKey && (action.type === POP_ACTION || action.type === POP_ACTION2)) {
                delete state.scenes[action.sceneKey];
            }

        }
        switch (action.type) {
            case POP_ACTION2:
            case POP_ACTION:
            case REFRESH_ACTION:
            case PUSH_ACTION:
            case JUMP_ACTION:
            case REPLACE_ACTION:
                return update(state, action);
            default:
                return state;

        }
    }
}

export default reducer;
