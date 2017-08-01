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
  return isActiveRoute(state.routes[state.index], routeName);
}

export function getActiveState(param) {
  const state = param;
  if (!state.routes) {
    return state;
  }
  return getActiveState(state.routes[state.index]);
}
