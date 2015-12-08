'use strict';

export default {

  // Navigator methods

  getCurrentRoutes() {
    return this.__navigator.getCurrentRoutes();
  },

  jumpBack() {
    return this.__navigator.jumpBack();
  },

  jumpForward() {
    return this.__navigator.jumpForward();
  },

  jumpTo(route) {
    return this.__navigator.jumpTo(route);
  },

  push(route) {
    return this.__navigator.push(route);
  },

  pop() {
    return this.__navigator.pop();
  },

  replace(route) {
    return this.__navigator.replace(route);
  },

  replaceAtIndex(route, index) {
    return this.__navigator.replaceAtIndex(route, index);
  },

  replacePrevious(route) {
    return this.__navigator.replacePrevious(route);
  },

  immediatelyResetRouteStack(routeStack) {
    return this.__navigator.immediatelyResetRouteStack(routeStack);
  },

  popToRoute(route) {
    return this.__navigator.popToRoute(route);
  },

  popToTop() {
    return this.__navigator.popToTop();
  },

  // Convenience methods

  /**
   * Replaces the top-most route with the given route and navigates to it
   * with a pop transition
   */
  transitionToTop(route) {
    this.replaceAtIndex(route, 0);
    this.popToTop();
  },

  /**
   * Pops back `n` routes. That is, `pop()` behaves like `popBack(1)`.
   */
  popBack(n) {
    let routes = this.getCurrentRoutes();
    this.popToRoute(routes[routes.length - n - 1]);
  },
};
