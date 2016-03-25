/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {PUSH_ACTION, PUSH_TO_CURRENT_ACTION, POP_ACTION2, FOCUS_ACTION, JUMP_ACTION, INIT_ACTION, REPLACE_ACTION, RESET_ACTION, POP_ACTION, REFRESH_ACTION} from './Actions';
import assert from 'assert';
import Immutable from 'immutable';
import {getInitialState} from './State';

function findElement(state, key) {
    if (state.sceneKey != key){
        if (state.children){
            let result = undefined;
            for (let el of state.children) {
                let res = findElement(el, key);
                if (res){
                    result = res;
                    break;
                }
            }
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

var _uniqPushed = 0;

function update(state,action){
    if (!state.scenes[action.key]) {
        console.log("No scene for key="+action.key);
        return state;
    }
    let newProps = {...state.scenes[action.key], ...action};
    let newState = Immutable.fromJS(state).toJS();

    // change route property
    //newState.scenes[action.key] = newProps;

    // get parent
    let parent = newProps.parent;
    assert(parent, "No parent is defined for route="+action.key);

    // find parent in the state
    let el = findElement(newState, parent);
    assert(el, "Cannot find element for parent="+parent+" within current state:"+JSON.stringify(newState));

    switch (action.type){
        case POP_ACTION2:
        case POP_ACTION:
            // recursive pop parent
            while (el.parent && (el.children.length <= 1 || el.tabs)){
                el = findElement(newState, el.parent);
                assert(el, "Cannot find element for parent="+el.parent+" within current state");
            }
            if (el.children.length > 1) {
                let popped = el.children.pop();
                el.index = el.children.length - 1;
                if (popped.ephemeral) {
                    delete newState.scenes[popped.key];
                }
                newState.scenes.current = getCurrent(newState).key;
                return newState;
            } else {
                console.log("Cannot do pop");
                return state;
            }

        case REFRESH_ACTION:
            let ind = -1;
            for (let i=0; i < el.children.length; i++) {
                let c = el.children[i];
                if (c.ephemeral) {
                    if (c.key === action.key) {
                        ind = i;
                        break;
                    }
                } else {
                    if (c.sceneKey === action.key) {
                        ind = i;
                        break;
                    }
                }
            }
            assert(ind!=-1, "Cannot find route with key="+action.key+" for parent="+el.key);
            el.children[ind] = getInitialState(newProps, newState.scenes, ind, action);
            return newState;

        case PUSH_TO_CURRENT_ACTION:
            parent = getCurrent(newState).parent;
            newProps.parent = parent;
            el = findElement(newState, parent);
            assert(el, "Cannot find element for parent="+parent+" within current state:"+JSON.stringify(newState));
            // fall through to PUSH_ACTION

        case PUSH_ACTION:
            newProps.ephemeral = true;
            newProps.key = `${_uniqPushed++}$${newProps.key}`;
            el.children.push(getInitialState(newProps, newState.scenes, el.children.length, action));
            el.index = el.children.length - 1;
            newState.scenes.current = getCurrent(newState).key;
            if (newProps.ephemeral) {
                assert(!newState.scenes.hasOwnProperty(newState.scenes.current), "scenes should not contain ephemeral key="+newState.scenes.current);
                newState.scenes[newState.scenes.current] = newProps;
            }
            return newState;

        case JUMP_ACTION:
            assert(el.tabs, "Parent="+el.key+" is not tab bar, jump action is not valid");
            ind = -1;
            el.children.forEach((c,i)=>{if (c.sceneKey==action.key){ind=i}});
            assert(ind!=-1, "Cannot find route with key="+action.key+" for parent="+el.key);
            //console.log("SETTING INDEX TO:", ind, el.key, action.key);
            el.index = ind;
            newState.scenes.current = getCurrent(newState);
            //console.log("NEW STATE:", newState);
            return newState;

        case REPLACE_ACTION:
            if (el.children && el.children.length){
                el.children[el.index] = getInitialState(newProps, newState.scenes, el.index, action);
            } else {
                el.children = [getInitialState(newProps, newState.scenes, 0, action)];
            }
            newState.scenes.current = getCurrent(newState).key;
            return newState;

        default:
            return state;
    }
}

function reducer({initialState, scenes}){
    assert(initialState, "initialState should not be null");
    assert(initialState.key, "initialState.key should not be null");
    assert(scenes, "scenes should not be null");
    assert(scenes.current, "scenes.current should not be null");
    return function(state, action){
        //console.log("ACTION:", action);
        state = state || {...initialState, scenes};
        //console.log("ACTION:", action);
        //console.log("STATE:", JSON.stringify(state));
        assert(action, "action should be defined");
        assert(action.type, "action type should be defined");
        assert(state.scenes, "state.scenes is missed");
        assert(state.scenes.current, "state.scenes.current should be defined");

        if (action.key){
            assert(state.scenes[action.key], "missed route data for key="+action.key);
        } else {
            // set current route for pop action or refresh action
            if (action.type === POP_ACTION || action.type === POP_ACTION2 || action.type === REFRESH_ACTION){
                action.key = state.scenes.current;
            }
        }

        switch (action.type) {
            case POP_ACTION2:
            case POP_ACTION:
            case REFRESH_ACTION:
            case PUSH_TO_CURRENT_ACTION:
            case PUSH_ACTION:
            case JUMP_ACTION:
            case REPLACE_ACTION:
                const newState = update(state, action);
                //console.log("NEW STATE:", JSON.stringify(newState));
                return newState;
            default:
                return state;

        }
    }


}

export default reducer;
