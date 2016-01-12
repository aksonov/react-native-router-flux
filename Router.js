/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Route from './Route';
import Actions from './Actions';
import debug from './debug';

export class RouterDelegate {
    onPush(name:string, props:{ [key: string]: any}):boolean {
        return true;
    }
    onPop(name:string, props:{ [key: string]: any}): boolean {
        return true;
    }
    onReplace(name:string, props:{ [key: string]: any}):boolean {
        return true;
    }
    onReset(name:string, props:{ [key: string]: any}):boolean {
        return true;
    }
    onSwitch(name:string, props:{ [key: string]: any}):boolean {
        return true;
    }
}

export default class Router {
    name:string;
    routes: {[key: string]: Route };
    schemas: {[key: string]: {[key:string]:any } };
    props: { [key: string]: any};
    parentRoute: ?Route;
    nextRoute: ?Route;
    _stack: Array<string>;
    delegate:RouterDelegate;

    set stack(stack:Array<string>) {
        if (!stack || !stack.length) {
            throw new Error("Cannot be set to empty stack");
        }
        this._stack = stack;
    }

    get stack():Array<string> {
        return this._stack;
    }

    get currentRoute():Route {
        return this.routes[this._stack[this._stack.length-1]];
    }

    get previousRoute():Route {
        if (this._stack.length > 1){
            return this.routes[this._stack[this._stack.length-2]];
        } else {
            return null;
        }
    }

    constructor(routes: Array<{ [key: string]: any}>,
                schemas:Array<{ [key: string]: any}> = [],
                stack:Array<string> = null, props:{ [key: string]: any} = {}){
        this.schemas = {};
        this.routes = {};
        this.pop = this.pop.bind(this);
        this.route = this.route.bind(this);
        this.delegate = new RouterDelegate();
        if (!routes || !routes.length){
            throw new Error("routes is not defined");
        }
        this.props = props;
        this.name = props && props.name;
        this.parentRoute = props && props.route;
        if (this.parentRoute){
            if (this.parentRoute.parent){
                // copy parent schemas
                Object.keys(this.parentRoute.parent.schemas).forEach(el=>
                    this._addSchema(this.parentRoute.parent.schemas[el].name, this.parentRoute.parent.schemas[el]));
            }
            this.parentRoute.childRouter = this;
        }


        schemas.forEach(el=>this._addSchema(el.name, el));
        let selected = null;
        routes.forEach(el=>{if (el.initial) selected = el.name;this._addRoute(el.name, el)});

        // select first one as initial
        if (!stack || !stack.length){
            stack = [selected || routes[0].name];
        }
        this.stack = stack;
        // add actions
        this._addActions();
    }

    _addSchema(name: string, props:{ [key: string]: any}){
        if (!name){
            throw new Error("Schema name is not defined");
        }
        if (this.schemas[name]){
            throw new Error("Schema="+name+" is not unique!");
        }
        this.schemas[name] = props;
    }

    _addRoute(name: string, props:{ [key: string]: any}){
        if (!name){
            throw new Error("Route name is not defined");
        }
        const schemaName: string = props.schema || 'default';
        const schema = this.schemas[schemaName] || {};
        // pass router data to inner routes
        const {children, data, ...routerProps}  = this.props;
        const routeProps = Object.assign({}, data, schema, props);

        if (this.routes[name]){
            throw new Error("Route="+name+" is not unique!");
        }

        this.routes[name] = new Route(routeProps, this);

    }

    _addActions(){
        if (!Actions.currentRouter){
            Actions.currentRouter = this;
        }
        Object.keys(this.routes).forEach(name=>{
            if (!Actions[name]){
                Actions[name] = function(data){
                    return Actions.route(name, data);
                }
            }
        });
    }

    route(name: string, props:{ [key: string]: any} = {}){
        if (!this.routes[name]){
            throw new Error("No route is defined for name="+name);
        }
        const action = this.routes[name].type === "switch" ? "jump": this.routes[name].type;
        if (!action){
            throw new Error("No type is defined for name="+name);
        }
        if (!this["_"+action]){
            throw new Error("No type="+action+" is supported");
        }
        this.nextRoute = this.routes[name];

        const handler = "on"+capitalizeFirstLetter(action);
        if (this.delegate[handler]) {
            debug("Run handler "+handler);
            const res:boolean = this.delegate[handler](this.routes[name], props);
            if (!res) {
                console.log("Ignore push, handler returns false");
                return false;
            }
        } else {
            throw new Error("No handler "+handler+" for route="+name);
        }
        this["_"+action](name, props);
        return true;
    }

    _push(name:string, props:{ [key: string]: any} ){
        this._stack.push(name);
    }

    _replace(name:string, props:{ [key: string]: any} ) {
        this._stack[this._stack.length - 1] = name;
    }
    /***
     * Reset every scene with an array of routes
     * @param route defined route
     */
    _reset(name:string, props:{ [key: string]: any} ) {
        this._stack = [name];
    }

    _jump(name:string, props:{ [key: string]: any} ) {
        if (this._stack.indexOf(name) != -1){
            const pos = this._stack.indexOf(name);
            // swap latest with found element (because currentRoute always points to latest)
            this._stack[pos] = this._stack[this._stack.length - 1];
            this._stack[this._stack.length - 1] = name;
        } else {
            this._stack.push(name);
        }
    }

    pop(num: number = 1){
        if (this._stack.length <= num){
            throw new Error("Cannot pop(), stack=["+this._stack+"]");
        }
        this.nextRoute = null;
        if (this.delegate.onPop && this.delegate.onPop(num)){
            const routes = this._stack.splice(-num, num);
            return true;
        }
        return false;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}