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

export function getActiveState(param, parent) {
  const state = param;
  if (!state.routes) {
    return { ...state, parent };
  }
  return getActiveState(state.routes[state.index], state);
}

export function inject(state, key, index) {
  if (!state.routes) {
    return state;
  }
  if (state.key === key) {
    return { ...state, index };
  }
  return { ...state, routes: state.routes.map(x => inject(x, key, index)) };
}
