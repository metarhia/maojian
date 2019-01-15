'use strict';

const assert = require('assert');
const {
  ImperativeTest,
  runner: { Runner },
} = require('../../metatests');

const test = new ImperativeTest('test', null, {
  dependentSubtests: true,
  runner: new Runner(),
});
let warned = false;

process.on('warning', warn => {
  warned = true;
  assert.strictEqual(
    warn.message,
    "Test 'subtest' is marked as TODO and will" +
      ' not be run as Runner.runTodo is false.'
  );
});

const subtest = test.test('subtest', null, { todo: true });
assert.strictEqual(subtest, null);
process.nextTick(() => assert(warned, 'must emit warning'));

test.end();
