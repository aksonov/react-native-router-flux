#!/usr/bin/env node

'use strict';

const path = require('path');
const rimraf = require('rimraf');

const [,, command, ...args] = process.argv;

const commands = {
  dedup: function () {
    const blacklisted = [
      'node_modules/react-native-router-flux/node_modules',
      'node_modules/react-native-router-flux/examples'
    ];

    blacklisted.map(function (part) {
      const current = path.join(process.env.PWD, part);
      rimraf(current, function (err) {
        if (err) throw err
        console.log(`${current} removed!`);
      });
    });
  }
};

commands[command](...args);
