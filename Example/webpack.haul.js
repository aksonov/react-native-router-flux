const path = require('path');

const REWRITE_MODULES = [
  'react-native',
  'react-navigation',
];

const REWROTE_MODULES = {};

for (const mod of REWRITE_MODULES) {
  REWROTE_MODULES[mod] = path.resolve(__dirname, 'node_modules', mod);
}

module.exports = ({ platform }, { resolve }) => ({
  entry: `./index.${platform}.js`,

  resolve: {
    ...resolve,
    alias: {
      ...resolve.alias,
      'react-native-router-flux': path.resolve(__dirname, '..'),

      // Switch all the deps to our local node_modules. THIS SUCKS YO
      ...REWROTE_MODULES,
    },
  },
});
