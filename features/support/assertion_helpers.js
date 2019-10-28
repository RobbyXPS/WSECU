const assert = require("assert");

async function assertTitle(page, actual, expected) {
  return await assert.equal(
    actual,
    expected,
    `The expected '${page}' page title of '${expected}' did not match the actual title of '${actual}'.`
  );
}

module.exports = { assertTitle };
