// this file is not transpiled, so must use commonjs and es5

'use strict';

// register babel to transpile tests before running them
require('babel-register')();

// disable webpack features that mocha does not understand
require.extensions['.css'] = () => {};
