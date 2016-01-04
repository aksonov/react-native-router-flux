/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type Router from './Router';
export default class Route {
    name: string;
    type: string;
    title: string;
    header: any;
    footer: any;
    component: any;
    children: any;
    props: { [key: string]: any};
    parent: Router;
    navigator: any;
    childRouter: ?Router;

    constructor({name, type, component, children, header, footer, wrapRouter, ...props}: { [key: string]: any} = {}, parent: Router = null) {
        if (!name) {
            throw new Error("no name is defined for Route=" + name);
        }
        if (!props) {
            throw new Error("no props is defined for Route=" + name);
        }
        this.name = name;
        this.type = type || 'push';
        this.component = component;
        this.children = children;
        if (!this.component && !this.children) {
            throw new Error("component or children should be defined for route=" + name);
        }
        if (!parent) {
            throw new Error("Parent router is not set!");
        }
        this.title = props.title;
        this.parent = parent;
        this.header = header;
        this.footer = footer;
        this.props = props;
        this.wrapRouter = wrapRouter || this.type == 'switch';

    }

}