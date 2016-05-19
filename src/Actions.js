/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { assert } from './Util';
import Scene from './Scene';
export const JUMP_ACTION = 'jump';
export const PUSH_ACTION = 'push';
export const REPLACE_ACTION = 'replace';
export const POP_ACTION2 = 'back';
export const POP_ACTION = 'BackAction';
export const REFRESH_ACTION = 'refresh';
export const RESET_ACTION = 'reset';
export const FOCUS_ACTION = 'focus';

function filterParam(data) {
  if (data.toString() !== '[object Object]') {
    return { data };
  }
  const proto = (data || {}).constructor.name;
  // avoid passing React Native parameters
  if (!data || (proto !== 'Object')) {
    return {};
  }
  return data;
}

const reservedKeys = [
  POP_ACTION,
  POP_ACTION2,
  REFRESH_ACTION,
  REPLACE_ACTION,
  JUMP_ACTION,
  PUSH_ACTION,
  FOCUS_ACTION,
  RESET_ACTION,
  'create',
  'callback',
  'iterate',
  'current',
];

class Actions {
  constructor() {
    this.callback = null;
    this.create = this.create.bind(this);
    this.iterate = this.iterate.bind(this);
    this.pop = this.pop.bind(this);
    this.refresh = this.refresh.bind(this);
    this.focus = this.focus.bind(this);
  }

  iterate(root: Scene, parentProps = {}, refsParam = {}) {
    const refs = refsParam;
    assert(root.props, 'props should be defined for stack');
    const key = root.key;
    assert(key, 'unique key should be defined ');
    assert(
      reservedKeys.indexOf(key) === -1,
      `'${key}' is not allowed as key name. Reserved keys: [${reservedKeys.join(', ')}]`,
    );
    const { children, ...staticProps } = root.props;
    let type = root.props.type || (parentProps.tabs ? JUMP_ACTION : PUSH_ACTION);
    if (type === 'switch') {
      type = JUMP_ACTION;
    }
    const res = {
      key,
      name: key,
      sceneKey: key,
      parent: parentProps.key,
      type,
      ...staticProps,
    };
    let list = children || [];
    if (!(list instanceof Array)) {
      list = [list];
    }
    const condition = el => (!el.props.component && !el.props.children &&
    (!el.props.type || el.props.type === REFRESH_ACTION));
    // determine sub-states
    let baseKey = root.key;
    let subStateParent = parentProps.key;
    const subStates = list.filter(condition);
    list = list.filter(el => !condition(el));
    if (list.length) {
      res.children = list.map(c => this.iterate(c, res, refs).key);
    } else {
      assert(staticProps.component, `component property is not set for key=${key}`);
      // wrap scene if parent is "tabs"
      if (parentProps.tabs) {
        const innerKey = `${res.key}_`;
        baseKey = innerKey;
        subStateParent = res.key;
        const inner = { ...res, name: key, key: innerKey,
          sceneKey: innerKey, type: PUSH_ACTION, parent: res.key };
        refs[innerKey] = inner;
        res.children = [innerKey];
        delete res.component;
      }
      res.index = 0;
    }
    // process substates
    for (const el of subStates) {
      refs[el.key] = { key: el.key, name: el.key, ...el.props, type: REFRESH_ACTION,
        base: baseKey, parent: subStateParent };
      if (this[el.key]) {
        console.log(`Key ${el.key} is already defined!`);
      }
      this[el.key] =
        (props = {}) => {
          assert(this.callback, 'Actions.callback is not defined!');
          this.callback({ key: el.key, type: REFRESH_ACTION, ...filterParam(props) });
        };
    }
    if (this[key]) {
      console.log(`Key ${key} is already defined!`);
    }
    this[key] =
      (props = {}) => {
        assert(this.callback, 'Actions.callback is not defined!');
        this.callback({ key, type, ...filterParam(props) });
      };
    refs[res.key] = res;

    return res;
  }

  pop(props = {}) {
    return this.callback({ ...filterParam(props), type: POP_ACTION });
  }

  jump(props = {}) {
    return this.callback({ ...filterParam(props), type: JUMP_ACTION });
  }

  refresh(props = {}) {
    return this.callback({ ...filterParam(props), type: REFRESH_ACTION });
  }

  focus(props = {}) {
    return this.callback({ ...filterParam(props), type: FOCUS_ACTION });
  }

  create(scene:Scene) {
    assert(scene, 'root scene should be defined');
    const refs = {};
    this.iterate(scene, {}, refs);
    return refs;
  }
}

export default new Actions();
