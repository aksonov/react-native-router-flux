export function getActiveStateExceptDrawer(param) {
  const state = param;
  if (!state.routes) {
    return state;
  }
  if (state.routes[state.index].routeName === 'DrawerOpen') {
    return getActiveState(state.routes[0]);
  }
  return getActiveState(state.routes[state.index]);
}

export function isActiveRoute(state, routeName) {
  if (state.routeName === routeName) {
    return true;
  }
  if (!state.routes) {
    return state.routeName === routeName;
  }
  if (state.routes[state.index].routeName === 'DrawerOpen') {
    return isActiveRoute(state.routes[0], routeName);
  }
  return isActiveRoute(state.routes[state.index], routeName);
}

export function getRouteNameByKey(state, key) {
  if (state.key === key) {
    return state.routeName;
  }
  if (!state.routes) {
    return state.routeName;
  }
  if (state.routes[state.index].key === key) {
    return state.routes[state.index].routeName;
  }
  return getRouteNameByKey(state.routes[state.index], key);
}

export function getActiveState(param, parent) {
  const state = param;
  if (!state.routes) {
    return { ...state, parent };
  }
  return getActiveState(state.routes[state.index], { ...state, parent });
}

export function getParent(state, routeName, parent) {
  if (state.routeName === routeName) {
    return parent;
  }
  if (!state.routes) {
    return null;
  }
  for (let i = 0; i < state.routes.length; i += 1) {
    const res = getParent(state.routes[i], routeName, state);
    if (res) {
      return res;
    }
  }
  return null;
}

export function inject(state, key, index, routes) {
  if (!state.routes) {
    return state;
  }
  if (state.key === key) {
    if (routes) {
      return { ...state, routes, index };
    }
    return { ...state, index };
  }
  return { ...state, routes: state.routes.map(x => inject(x, key, index, routes)) };
}

export function popPrevious(state, routeName) {
  const parent = getParent(state, routeName);
  // console.log('FOUND PARENT:', JSON.stringify(parent));
  const { key, index } = parent;
  if (index) {
    const routes = [...parent.routes.slice(0, index - 1), ...parent.routes.slice(index)];
    const newState = inject(state, key, index - 1, routes);
    return newState;
  }
  return state;
}
