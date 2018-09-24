export function filterParam(data = {}) {
  if (data.toString() !== '[object Object]') {
    return { data };
  }
  const proto = (data || {}).constructor.name;
  // avoid passing React Native parameters
  if (!data || proto !== 'Object') {
    return {};
  }
  return data;
}

export function uniteParams(routeName, params) {
  let res = {};
  for (const param of params) {
    if (param) {
      res = { ...res, ...filterParam(param) };
    }
  }
  res.routeName = routeName;
  return res;
}

export function defaultSuccess() { };
export function defaultFailure() { };

export function getValue(value, params) {
  return value instanceof Function ? value(params) : value;
}

export function originalRouteName(routeName) {
  if (routeName.startsWith('_')) {
    return routeName.substring(1);
  }
  return routeName;
}

// check if a component is stateless by the lack of render or prototype
export function isStatelessComponent(Component) {
  return !Component.prototype || typeof Component.prototype.render !== 'function';
}
// searches for the deepest explicitly set value for a key
// in a navigationState tree.
export function deepestExplicitValueForKey(navigationState, key) {
  let current;
  let selected = navigationState;

  while ({}.hasOwnProperty.call(selected, 'children')) {
    if (!selected.tabs) {
      // for pushed children, iterate through each, recording key value,
      // until reaching the selected child
      for (let i = 0; i < selected.index; i += 1) {
        if (typeof selected.children[i][key] !== 'undefined') {
          current = selected.children[i][key];
        }
      }
    }
    // set the new selected child and check for a key value
    selected = selected.children[selected.index];
    if (typeof selected[key] !== 'undefined') {
      current = selected[key];
    }
  }

  // fallback to the root key value
  if (typeof current === 'undefined') {
    current = navigationState[key];
  }

  return current;
}

export function assert(expr, failDescription) {
  if (!expr) {
    throw new Error(`[react-native-router-flux] ${failDescription}`);
  }
}

export const OnEnter = 'onEnter';
export const OnExit = 'onExit';
