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

function findElement(state, key) {
    if (state.key != key){
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
        return state.key;
    }
    return getCurrent(state.children[state.index]);
}



function update(state,action){
    // clone state, TODO: clone effectively?
    const newProps = {...state.scenes[action.key], ...action};
    let newState = Immutable.fromJS(state).toJS();

    // change route property
    newState.scenes[action.key] = newProps;

    // get parent
    const parent = newProps.parent;
    assert(parent, "No parent is defined for route="+action.key);

    // find parent in the state
    let el = findElement(newState, parent);
    assert(el, "Cannot find element for parent="+parent+" within current state");

    switch (action.type){
        case POP_ACTION2:
        case POP_ACTION:
            // recursive pop parent
            while (el.children.length <= 1 || el.tabs){
                el = findElement(newState, el.parent);
                assert(el, "Cannot find element for parent="+el.parent+" within current state");
            }
            assert(el.children.length > 1, "Cannot pop because length of stack key="+el.key+" is less than 2 "+el.children.length);
            el.children.pop();
            el.index = el.children.length - 1;
            newState.scenes.current = getCurrent(newState);
            return newState;

        case REFRESH_ACTION:
            let ind = -1;
            el.children.forEach((c,i)=>{if (c.key==action.key){ind=i}});
            assert(ind!=-1, "Cannot find route with key="+action.key+" for parent="+el.key);
            el.children[ind] = getInitialState(newProps, newState.scenes);
            return newState;

        case PUSH_ACTION:
            el.children.push(getInitialState(newProps, newState.scenes));
            el.index = el.children.length - 1;
            newState.scenes.current = getCurrent(newState);
            return newState;

        case JUMP_ACTION:
            assert(el.tabs, "Parent="+el.key+" is not tab bar, jump action is not valid");
            ind = -1;
            el.children.forEach((c,i)=>{if (c.key==action.key){ind=i}});
            assert(ind!=-1, "Cannot find route with key="+action.key+" for parent="+el.key);
            el.children[ind] = getInitialState(newProps, newState.scenes);
            //console.log("SETTING INDEX TO:", ind, el.key, action.key);
            el.index = ind;
            newState.scenes.current = getCurrent(newState);
            //console.log("NEW STATE:", newState);
            return newState;

        case REPLACE_ACTION:
            if (el.children && el.children.length){
                el.children[el.index] = getInitialState(newProps, newState.scenes);
            } else {
                el.children = [getInitialState(newProps, newState.scenes)];
            }
            newState.scenes.current = getCurrent(newState);
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
        console.log("ACTION:", action);
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
            case PUSH_ACTION:
            case JUMP_ACTION:
            case REPLACE_ACTION:
                const newState = update(state, action);
//                console.log("NEW STATE:", JSON.stringify(newState));
                return newState;
            default:
                return state;

        }
    }


}

export default reducer;