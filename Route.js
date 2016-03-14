/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Actions from './Actions';
import type BaseRouter from './BaseRouter';
export default class Route {
    name: string;
    type: string;
    title: string;
    header: any;
    footer: any;
    component: any;
    children: any;
    props: { [key: string]: any};
    parent: BaseRouter;
    navigator: any;
    childRouter: ?BaseRouter;

    constructor({name, type, component, schema, children, header, footer, wrapRouter, ...props}: { [key: string]: any} = {}, parent: BaseRouter = null) {
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
        if (!parent) {
            throw new Error("Parent router is not set!");
        }
        this.title = props.title;
        this.parent = parent;
        this.header = header;
        this.footer = footer;
        this.props = props;
        this.wrapRouter = wrapRouter || type=='switch';
        this.pop = this.pop.bind(this)
    }

    pop(num: number = 1, props: { [key: string]: any} = {}) {
        Actions.pop(num, props, this.parent);
    }
}
