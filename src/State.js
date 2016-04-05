/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import assert from "assert";

export function getInitialState(route:{string: any},scenes:{string:any}, position=0, props={}){
    const {key, style, type, ...parentProps} = props;
    if (!route.children){
        return { ...scenes.rootProps, ...route, key:position+"_"+route.sceneKey, ...parentProps,};
    }
    let {children, ...res} = {...route, ...parentProps};
    let index = 0;
    route.children.forEach((r,i)=>{assert(scenes[r], "Empty scene for key="+route.key); if (scenes[r].initial) index=i});

    if (route.tabs){
        res.children = route.children.map((r,i)=>getInitialState(scenes[r],scenes,i, props));
        res.index = index;
    } else {
        res.children = [getInitialState(scenes[route.children[index]],scenes, 0, props)];
        res.index = 0;
    }
    res.key = position+"_"+res.key;
    return res;
}

export default function(scenes:{string: any}, props){
    // find "root" component and get state from it
    for (let route in scenes){
        if (scenes.hasOwnProperty(route) && !scenes[route].parent){
            return getInitialState(scenes[route], scenes);
        }
    }
}
