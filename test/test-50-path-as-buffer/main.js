#!/usr/bin/env node

/* eslint-disable no-multi-spaces */

'use strict';

const path = require('path');
const assert = require('assert');
const utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

const host = 'node' + process.version.match(/^v(\d+)/)[1];
const target = process.argv[2] || host;
const input = './test-x-index.js';
const output = './test-output.exe';

function isNode8(version) {
  return /^(node|v)?8/.test(version);
}

const version1 = process.version;
const version2 = target;

if (isNode8(version1) === isNode8(version2)) {
  let left, right;

  left = utils.spawn.sync('node', [path.basename(input)], {
    cwd: path.dirname(input),
  });

  utils.pkg.sync(['--target', target, '--output', output, input]);

  right = utils.spawn.sync('./' + path.basename(output), [], {
    cwd: path.dirname(output),
  });

  assert.strictEqual(left, right);
  utils.vacuum.sync(output);
}
