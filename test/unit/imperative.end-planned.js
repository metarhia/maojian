'use strict';

const assert = require('assert');
const { ImperativeTest } = require('../..');

const test = new ImperativeTest();
test.plan(1);
test.end();

const [result] = test.results;
assert.deepStrictEqual(result, {
  success: false,
  type: 'test',
  message: "End called in a 'plan' test",
});
