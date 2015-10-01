'use strict';

// Babel is an ES6 transpiler.  Read more about it at https://babeljs.io/
var babel = require('babel-core');

module.exports = {
  process: function (src, filename) {
    // Don't transpile node modules.
    if (filename.match(/node_modules/)) {
      return src;
    }

    var result = babel.transform(src, {filename: filename});
    return result.code;
  }
};