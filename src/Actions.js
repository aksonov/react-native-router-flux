/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import assert from 'assert';
import Scene from './Scene';
export const JUMP_ACTION = 'jump';
export const PUSH_ACTION = 'push';
export const REPLACE_ACTION = 'replace';
export const POP_ACTION2 = 'back';
export const POP_ACTION = 'BackAction';
export const REFRESH_ACTION = 'refresh';
export const RESET_ACTION = 'reset';
export const INIT_ACTION = 'init';
export const FOCUS_ACTION = 'focus';

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

    iterate(root: Scene, parentProps = {}, refs = {}) {
        assert(root.props, "props should be defined for stack");
        const key = root.key;
        assert(key, "unique key should be defined " + JSON.stringify(root));
        assert([POP_ACTION, POP_ACTION2, REFRESH_ACTION, REPLACE_ACTION, JUMP_ACTION, PUSH_ACTION, RESET_ACTION, 'create',
                'init','callback','iterate','current'].indexOf(key)==-1, key+" is not allowed as key name");
        const {children, ...staticProps} = root.props;
        let type = root.props.type || (parentProps.tabs ? JUMP_ACTION : PUSH_ACTION);
        if (type === 'switch'){
            type = JUMP_ACTION;
        }
        let res = {name:key, ...staticProps, key, type, parent:parentProps.key};
        if (root.props.children) {
            const list = root.props.children instanceof Array ? root.props.children: [root.props.children];
            res.children = list.map(c=>this.iterate(c, res, refs).key);
        } else {
            assert(staticProps.component, "component property is not set for key="+key);
            // wrap scene if parent is 'tabs'
            if (parentProps.tabs) {
                const innerKey = res.key + '_';
                const inner = {...res, name:key, key: innerKey, type: PUSH_ACTION, parent:res.key}
                refs[innerKey] = inner;
                res.children = [innerKey];
            }
            res.index = 0;
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

    jump(props = {}){
        props = filterParam(props);
        this.callback && this.callback({...props, type: JUMP_ACTION});
    }

    init(props = {}){
        props = filterParam(props);
        this.callback && this.callback({...props, type: INIT_ACTION});
    }

    refresh(props = {}){
        props = filterParam(props);
        this.callback && this.callback({...props, type: REFRESH_ACTION});
    }

    create(scene:Scene){
        assert(scene, "roote scene should be defined");
        let refs = {};
        this.iterate(scene, {}, refs);
        return refs
    }
}

export default new Actions();
