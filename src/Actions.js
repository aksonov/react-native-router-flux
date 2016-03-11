/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import Stack from './Stack';
import assert from 'assert';

export const JUMP_ACTION = 'jump';
export const PUSH_ACTION = 'push';
export const REPLACE_ACTION = 'replace';
export const POP_ACTION = 'back';
export const REFRESH_ACTION = 'refresh';
export const RESET_ACTION = 'reset';
export const INIT_ACTION = 'init';

function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function filterParam(data){
    if (data.toString()!='[object Object]')
        return {data: data};
    if (!data){
        return {};
    }
    var proto = (data||{}).constructor.name;
    // avoid passing React Native parameters
    if (proto != 'Object'){
        data = {};
    }
    return data;
}

class Actions {
    constructor(){
        this.callback = null;
        this.create = this.create.bind(this);
        this.iterate = this.iterate.bind(this);
        this.init = this.init.bind(this);
        this.pop = this.pop.bind(this);
        this.refresh = this.refresh.bind(this);

    }

    iterate(root: Stack, parentProps = {}, refs = {}) {
        assert(root.props, "props should be defined for stack");
        const key = root.key;
        assert(key, "unique key should be defined " + JSON.stringify(root));
        assert([POP_ACTION, REFRESH_ACTION, REPLACE_ACTION, PUSH_ACTION, RESET_ACTION, 'create',
                'init','callback','iterate','current'].indexOf(key)==-1, key+" is not allowed as key name");
        const {children, ...staticProps} = root.props;
        let type = root.props.type || (parentProps.type === 'tabs' ? JUMP_ACTION : PUSH_ACTION);
        if (type === 'switch'){
            type = 'jump';
        }
        let res = {...staticProps, key, type, parent:parentProps.key};
        if (root.props.children) {
            const list = root.props.children instanceof Array ? root.props.children: [root.props.children];
            res.children = list.map(c=>this.iterate(c, res, refs).key);
        }
        assert(!this[key], "Key " + root.key + " is already defined!");
        this[key] =
            (props={})=> {assert(this.callback, "Actions.callback is not defined!");
            this.callback({key: root.key, type, ...filterParam(props)})};
        refs[res.key]=res;

        return res;
    }

    pop(props = {}){
        props = filterParam(props);
        const data = isNumeric(props) ? {num: props} : props;
        this.callback && this.callback({...props, type: POP_ACTION});
    }

    init(props = {}){
        props = filterParam(props);
        this.callback && this.callback({...props, type: INIT_ACTION});
    }

    refresh(props = {}){
        props = filterParam(props);
        this.callback && this.callback({...props, type: REFRESH_ACTION});
    }

    create(routes:Stack){
        assert(routes, "Routes should be Stack element");
        let refs = {};
        this.iterate(routes, {}, refs);
        return refs
    }
}

export default new Actions();
