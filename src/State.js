export function getActiveState(param) {
  const state = param;
  if (!state.routes) {
    return state;
  }
  return getActiveState(state.routes[state.index]);
}
