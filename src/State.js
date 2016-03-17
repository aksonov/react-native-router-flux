/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import assert from 'assert';

export function getInitialState(route:{string: any},scenes:{string:any},position=0){
    if (!route.children){
        return {...route, sceneKey:route.key, key:position+'_'+route.key};
    }
    let {children, ...res} = route;
    let index = 0;
    route.children.forEach((r,i)=>{assert(scenes[r], "Empty scene for key="+route.key+" "+JSON.stringify(r)); if (scenes[r].initial) index=i});

    if (route.tabs){
        res.children = route.children.map((r,i)=>getInitialState(scenes[r],scenes,i));
        scenes.current = res.children[index].key;
        res.index = index;
    } else {
        res.children = [getInitialState(scenes[route.children[index]],scenes)];
        scenes.current = res.children[0].key;
        res.index = 0;
    }
    res.sceneKey = res.key;
    res.key = position+'_'+res.key;
    return res;
}

export default function(scenes:{string: any}){
    for (let route in scenes){
        if (scenes.hasOwnProperty(route) && !scenes[route].parent){
            return getInitialState(scenes[route], scenes);
        }
    }
}
