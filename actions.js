/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import Route from './route';

function filterParam(data){
    if (typeof(data)!='object')
        return data;
    if (!data){
        return;
    }
    var proto = (data||{}).constructor.name;
    // avoid passing React Native parameters
    if (proto != 'Object'){
        data = {};
    }
    if (data.data){
        data.data = filterParam(data.data);
    }
    return data;
}

function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/***
 * Class represents navigation 'actions' (push, pop, replace, switch) and also allows to add custom actions
 */
class Actions {
    constructor(){
        this.onPush = null;
        this.onPop = null;
        this.onReplace = null;
        this.onSwitch = null;
        this.navs = {};
        this.nav = null;
        this.push = this.push.bind(this);
        this.pop = this.pop.bind(this);
        this.replace = this.replace.bind(this);
    }

    /***
     * Sets navigator instance for action with given name
     * @param name action name
     * @param nav navigator instance
     */
    setNavigator(name, nav){
        this.navs[name] = nav;
    }

    /**
     * Add new action with given name, props and schemas
     * @param name action name
     * @param props route props
     * @param schemas route schemas
     */
    addAction(name, props, schemas){
        if (!name) {
            throw Error("No name is defined for the router");
        }
        if (!props) {
            throw Error("No props is defined for the route=" + name);
        }
        const self = this;
        this[name] = function(data) {
            if (typeof(data) != 'object') {
                data = {data: data};
            }
            data = filterParam(data);
            const route = new Route({...props, ...data, name}, schemas);
            var action = route.getType();
            if (!self[action]){
                throw Error("No action="+action+" exist for route="+route.getName());
            }
            self[action](route);

        }
    }

    /***
     * Push new route to current nav stack
     * @param route defined route
     */
    push(route){
        const name = route.getName();
        const navigator = this.navs[name];
        // set latest navigator
        this.nav = navigator;

        if (this.onPush){
            // don't do action if it is not allowed (onPush returned false)
            if (!this.onPush(navigator, route)){
                return;
            }
        }
        navigator.push(route);
    }

    /***
     * Replace current route with defined route
     * @param route defined route
     */
    replace(route){
        const name = route.getName();
        const navigator = this.navs[name];
        if (this.onReplace){
            // don't do action if it is not allowed (onPush returned false)
            if (!this.onReplace(navigator, route)){
                return;
            }
        }
        navigator.replace(route);
    }

    /***
     * Switch to defined route (so it will jump to existing route if it exists within nav stack or push otherwise), usable for tab bar.
     * @param route defined route
     */
    switch(route){
        const name = route.getName();
        const navigator = this.navs[name];
        if (this.onSwitch){
            // don't do action if it is not allowed (onPush returned false)
            if (!this.onSwitch(navigator, route)){
                return;
            }
        }
        const routes = navigator.getCurrentRoutes();
        const exist = routes.filter(el=>el.getName()==route.getName());
        if (exist.length){
            navigator.jumpTo(exist[0]);
        } else {
            navigator.push(route);

        }
        // set navigator accordingly
        this.nav = navigator;

    }

    /***
     * Pop current scene from navigator, data could be number indicates number of screens to pop
     * @param data
     */
    pop(data){
        data = filterParam(data);
        const number = isNumeric(data) ? data : 1;
        let navigator = this.nav;
        let routes = navigator.getCurrentRoutes();
        // ignore 'switch' routes
        while (routes.length > 0 && routes[routes.length-1].getType() === 'switch' && navigator.parentNavigator){
            navigator = navigator.parentNavigator;
            routes = navigator.getCurrentRoutes();
        }
        while (routes.length <= number){
            // try parent navigator if we cannot pop current one
            if (navigator.parentNavigator){
                navigator = navigator.parentNavigator;
                routes = navigator.getCurrentRoutes();
            } else {
                throw new Error("Cannot pop navigator with less than "+number+" screens");
            }
        }
        const route = routes[routes.length-number-1];
        if (this.onPop){
            // don't do action if it is not allowed (onPop returned false)
            if (!this.onPop(navigator, route)){
                return;
            }
        }
        const name = route.getName();// name of route
        // set navigator accordingly
        this.nav = this.navs[name];
        navigator.popToRoute(routes[routes.length-number-1]);
    }
}


export default new Actions();