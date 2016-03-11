/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {PUSH_ACTION, JUMP_ACTION, INIT_ACTION, REPLACE_ACTION, RESET_ACTION, POP_ACTION, REFRESH_ACTION} from './Actions';
import assert from 'assert';
import Immutable from 'immutable';

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

function update(state,action){
    // clone state, TODO: clone effectively?
    const newProps = {...state.routes[action.key], ...action};
    let newState = Immutable.fromJS(state).toJS();

    // change route property
    newState.routes[action.key] = newProps;

    // get parent
    const parent = newProps.parent;
    assert(parent, "No parent is defined for route="+action.key);

    // find parent in the state
    const el = findElement(newState, parent);
    assert(el, "Cannot find element for parent="+parent+" within current state");

    switch (action.type){
        case POP_ACTION:
            assert(el.children.length > 1, "Cannot pop because length of stack key="+el.key+" is less than 2 "+el.children.length);
            el.children.pop();
            el.index = el.children.length - 1;
            newState.routes.current = el.children[el.index].key;
            return newState;

        case REFRESH_ACTION:
            let ind = -1;
            el.children.forEach((c,i)=>{if (c.key==action.key){ind=i}});
            assert(ind!=-1, "Cannot find route with key="+action.key+" for parent="+el.key);
            el.children[ind] = newProps;
            return newState;

        case PUSH_ACTION:
            el.children.push(newProps);
            el.index = el.children.length - 1;
            newState.routes.current = action.key;
            return newState;

        case JUMP_ACTION:
            assert(el.type === 'tabs', "Parent="+el.key+" is not tab bar, jump action is not valid");
            ind = -1;
            el.children.forEach((c,i)=>{if (c.key==action.key){ind=i}});
            assert(ind!=-1, "Cannot find route with key="+action.key+" for parent="+el.key);
            el.children[ind] = newProps;
            el.index = ind;
            newState.routes.current = action.key;
            return newState;

        case REPLACE_ACTION:
            newState.children[el.index] = newProps;
            return newState;

        default:
            return newState;
    }
}

function reducer({initialState, routes}){
    assert(initialState, "initialState should not be null");
    assert(initialState.key, "initialState.key should not be null");
    assert(routes, "routes should not be null");
    assert(routes.current, "routes.current should not be null");
    return function(state, action){
        state = state || {...initialState, routes};
        console.log("ACTION:", action);
        console.log("STATE:", JSON.stringify(state));
        assert(action, "action should be defined");
        assert(action.type, "action type should be defined");
        assert(state.routes, "state.routes is missed");
        assert(state.routes.current, "state.routes.current should be defined");

        // set current route for pop action
        if (action.type === POP_ACTION){
            action.key = state.routes.current;
        }
        if (action.key){
            assert(state.routes[action.key], "missed route data for key="+action.key);
        }

        switch (action.type) {
            case POP_ACTION:
            case REFRESH_ACTION:
            case PUSH_ACTION:
            case JUMP_ACTION:
            case REPLACE_ACTION:
                const newState = update(state, action);
                console.log("NEW STATE:", JSON.stringify(newState));
                return newState;
            default:
                return state;

        }
    }


}

export default reducer;