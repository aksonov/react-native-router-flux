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
import * as ActionConst from './ActionConst';

export const ActionMap = {
  jump: ActionConst.JUMP,
  push: ActionConst.PUSH,
  replace: ActionConst.REPLACE,
  back: ActionConst.BACK,
  BackAction: ActionConst.BACK_ACTION,
  popAndReplace: ActionConst.POP_AND_REPLACE,
  popTo: ActionConst.POP_TO,
  refresh: ActionConst.REFRESH,
  reset: ActionConst.RESET,
  focus: ActionConst.FOCUS,
  pushOrPop: ActionConst.PUSH_OR_POP,
  androidBack: ActionConst.ANDROID_BACK,
  [ActionConst.JUMP]: ActionConst.JUMP,
  [ActionConst.PUSH]: ActionConst.PUSH,
  [ActionConst.REPLACE]: ActionConst.REPLACE,
  [ActionConst.BACK]: ActionConst.BACK,
  [ActionConst.BACK_ACTION]: ActionConst.BACK_ACTION,
  [ActionConst.POP_AND_REPLACE]: ActionConst.POP_AND_REPLACE,
  [ActionConst.POP_TO]: ActionConst.POP_TO,
  [ActionConst.REFRESH]: ActionConst.REFRESH,
  [ActionConst.RESET]: ActionConst.RESET,
  [ActionConst.FOCUS]: ActionConst.FOCUS,
  [ActionConst.PUSH_OR_POP]: ActionConst.PUSH_OR_POP,
  [ActionConst.ANDROID_BACK]: ActionConst.ANDROID_BACK,
};

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
  'create',
  'callback',
  'iterate',
  'current',
  ...Object.keys(ActionMap),
];

function getInheritProps(props) {
  // eslint-disable-next-line no-unused-vars
  const { key, style, type, component, tabs, sceneKey, parent, children, ...parentProps } = props;
  return parentProps.passProps ? parentProps : {};
}

class Actions {
  constructor() {
    this.callback = null;
    this.create = this.create.bind(this);
    this.iterate = this.iterate.bind(this);
    this.pop = this.pop.bind(this);
    this.refresh = this.refresh.bind(this);
    this.focus = this.focus.bind(this);
  }

  iterate(root: Scene, parentProps = {}, refsParam = {}, wrapBy) {
    const refs = refsParam;
    assert(root.props, 'props should be defined for stack');
    const key = root.key;
    assert(key, 'unique key should be defined ');
    assert(
      reservedKeys.indexOf(key) === -1,
      `'${key}' is not allowed as key name. Reserved keys: [${reservedKeys.join(', ')}]`,
    );
    const { children, component, ...staticProps } = root.props;
    let type = root.props.type || (parentProps.tabs ? ActionConst.JUMP : ActionConst.PUSH);
    if (type === 'switch') {
      type = ActionConst.JUMP;
    }
    const inheritProps = getInheritProps(parentProps);
    const componentProps = component ? { component: wrapBy(component) } : {};
    // wrap other components
    if (wrapBy) {
      Object.keys(staticProps).forEach((prop) => {
        const componentClass = staticProps[prop];
        if (componentClass && componentClass.prototype && componentClass.prototype.render) {
          componentProps[prop] = wrapBy(componentClass);
          delete staticProps[prop];
        }
      });
    }
    const res = {
      key,
      name: key,
      sceneKey: key,
      parent: parentProps.key,
      type,
      ...inheritProps,
      ...staticProps,
      ...componentProps,
    };
    let list = children || [];
    const normalized = [];
    if (!(list instanceof Array)) {
      list = [list];
    }
    list.forEach((item) => {
      if (item) {
        if (item instanceof Array) {
          item.forEach((it) => {
            normalized.push(it);
          });
        } else {
          normalized.push(item);
        }
      }
    });
    list = normalized; // normalize the list of scenes

    const condition = el => (!el.props.component && !el.props.children && !el.props.onPress &&
    (!el.props.type || ActionMap[el.props.type] === ActionConst.REFRESH));
    // determine sub-states
    let baseKey = root.key;
    let subStateParent = parentProps.key;
    const subStates = list.filter(condition);
    list = list.filter(el => !condition(el));
    if (list.length) {
      res.children = list.map(c => this.iterate(c, res, refs, wrapBy).key);
    } else {
      if (!staticProps.onPress) {
        assert(component, `component property is not set for key=${key}`);
      }
      // wrap scene if parent is "tabs"
      if (parentProps.tabs) {
        const innerKey = `${res.key}_`;
        baseKey = innerKey;
        subStateParent = res.key;
        const inner = { ...res,
          name: key,
          key: innerKey,
          sceneKey: innerKey,
          type: ActionConst.PUSH,
          parent: res.key };
        refs[innerKey] = inner;
        res.children = [innerKey];
        delete res.component;
      }
      res.index = 0;
    }
    // process substates
    for (const el of subStates) {
      refs[el.key] = { key: el.key,
        name: el.key,
        ...el.props,
        type: ActionConst.REFRESH,
        base: baseKey,
        parent: subStateParent };
      if (this[el.key]) {
        console.log(`Key ${el.key} is already defined!`);
      }
      this[el.key] =
        (props = {}) => {
          assert(this.callback, 'Actions.callback is not defined!');
          this.callback({ key: el.key, type: ActionConst.REFRESH, ...filterParam(props) });
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

  popTo(props = {}) {
    return this.callback({ ...filterParam(props), type: ActionConst.POP_TO });
  }

  pop(props = {}) {
    return this.callback({ ...filterParam(props), type: ActionConst.BACK_ACTION });
  }

  jump(props = {}) {
    return this.callback({ ...filterParam(props), type: ActionConst.JUMP });
  }

  refresh(props = {}) {
    return this.callback({ ...filterParam(props), type: ActionConst.REFRESH });
  }

  focus(props = {}) {
    return this.callback({ ...filterParam(props), type: ActionConst.FOCUS });
  }

  androidBack(props = {}) {
    return this.callback({ ...filterParam(props), type: ActionConst.ANDROID_BACK });
  }

  create(scene:Scene, wrapBy = x => x) {
    assert(scene, 'root scene should be defined');
    const refs = {};
    this.iterate(scene, {}, refs, wrapBy);
    return refs;
  }
}

export { Actions as ActionsTest };
export default new Actions();
