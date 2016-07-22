/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { assert } from './Util';

function getStateFromScenes(route, scenes, props) {
  const getters = [];
  let result = {};
  let scene = route;
  while (scene) {
    if (scene.getInitialState) {
      getters.push(scene.getInitialState);
    }
    scene = scenes[scene.parent];
  }

  if (scenes.rootProps && scenes.rootProps.getInitialState) {
    getters.push(scenes.rootProps.getInitialState);
  }

  getters.reverse().forEach(fn => {
    result = { ...result, ...fn(props) };
  });

  return result;
}

function getSceneKey(parent, key, position, sceneKey) {
  return [parent, key, position, sceneKey]
    .filter(v => typeof(v) !== 'undefined' && v !== null)
    .join('_');
}

export function getInitialState(
  route: {string: any},
  scenes: {string: any},
  position = 0,
  props = {}
) {
  // eslint-disable-next-line no-unused-vars
  const { parent, key, style, type, ...parentProps } = props;
  if (!route.children) {
    return {
      ...scenes.rootProps,
      ...route,
      key: getSceneKey(parent, key, position, route.sceneKey),
      ...parentProps,
      ...getStateFromScenes(route, scenes, props),
    };
  }
  const res = { ...route, ...scenes.rootProps, ...parentProps };
  let index = 0;
  route.children.forEach((r, i) => {
    assert(scenes[r], `Empty scene for key=${route.key}`);
    if (scenes[r].initial) {
      index = i;
    }
  });

  if (route.tabs) {
    res.children = route.children.map((r, i) => getInitialState(scenes[r], scenes, i, props));
    res.index = index;
  } else {
    res.children = [getInitialState(scenes[route.children[index]], scenes, 0, props)];
    res.index = 0;
  }
  res.key = `${position}_${res.key}`;
  return res;
}

export default function (scenes:{string: any}) {
  // find "root" component and get state from it
  const rootRoute = Object.keys(scenes).find((route) =>
    scenes.hasOwnProperty(route) && !scenes[route].parent);

  return getInitialState(scenes[rootRoute], scenes);
}
