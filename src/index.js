/* @flow */
/* eslint-disable import/no-commonjs */

module.exports = {
  get Actions() {
    return require('./navigationStore').default;
  },
  get ActionConst() {
    return require('./ActionConst').default;
  },
  get Reducer() {
    return require('./Reducer').default;
  },
  get Router() {
    return require('./Router').default;
  },
  get navigationStore() {
    return require('./navigationStore').default;
  },
  get Scene() {
    return require('./Scene').default;
  },
};
