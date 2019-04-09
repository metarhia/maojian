'use strict';

const assert = require('assert');
const { ImperativeTest } = require('../../metatests');

const test = new ImperativeTest('', null, { timeout: 1000 });
const st1 = test.testSync('successful subtest', t => t.pass(), {
  timeout: 1000,
});
const st2 = test.testSync('failing subtest', t => t.fail(), { timeout: 1000 });
test.on('done', () => {
  assert.deepStrictEqual(test.results, [
    {
      type: 'subtest',
      test: st1,
      message: 'successful subtest',
      success: true,
    },
    {
      type: 'subtest',
      test: st2,
      message: 'failing subtest',
      success: false,
    },
  ]);
});

let error;
const erroringTest = new ImperativeTest('', null, { timeout: 1000 });
const st3 = erroringTest.testSync('throwing test', () => {
  throw new Error();
});
st3.on('error', (test, err) => {
  error = err;
});
st3.end();
erroringTest.on('done', () => {
  assert.deepStrictEqual(erroringTest.results, [
    {
      type: 'subtest',
      test: st3,
      message: 'throwing test',
      success: true,
    },
    {
      test: st3,
      message: `Error in subtest '${st3.caption}': ${error}`,
      stack: error.stack,
      type: 'subtest',
      success: false,
    },
  ]);
});
