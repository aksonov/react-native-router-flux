/* @flow */
/* eslint-disable import/no-commonjs */

module.exports = {
  get Actions() {
    return require('./src/navigationStore').default;
  },
  get ActionConst() {
    return require('./src/ActionConst').default;
  },
  get Router() {
    return require('./src/Router').default;
  },
  get navigationStore() {
    return require('./src/navigationStore').default;
  },
  get Scene() {
    return require('./src/Scene').default;
  },
};
