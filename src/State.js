/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export function getInitialState(route:{string: any},routes:{string:any}){
    if (!route.children){
        return {...route};
    }
    let {children, ...res} = route;
    let index = 0;
    route.children.forEach((r,i)=>{if (routes[r].initial) index=i});

    if (route.type === 'tabs'){
        res.children = route.children.map(r=>getInitialState(routes[r],routes));
        res.tabs = res.children;
        routes.current = res.children[index].key;
        res.index = index;
    } else {
        res.children = [getInitialState(routes[route.children[index]],routes)];
        routes.current = res.children[0].key;
        res.index = 0;
    }
    return res;
}

export default function(routes:{string: any}){
    for (let route in routes){
        if (routes.hasOwnProperty(route) && !routes[route].parent){
            return getInitialState(routes[route], routes);
        }
    }
}
