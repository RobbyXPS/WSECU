const assert = require("assert");

async function assertTitle(page, actual, expected) {
  return await assert.equal(
    actual,
    expected,
    `The expected '${page}' page title of '${expected}' did not match the actual title of '${actual}'.`
  );
}

async function assertInputField(actual, expected) {
  return await assert.equal(
    actual,
    expected,
    `The input field had a value of '${actual}' but was expected to have a value of '${expected}'.`
  );
}

async function assertUserType(usertype) {
  // list of supported usertypes
  // if you add a new one don't forget to add to '../shared-objects/test-data'
  var supportedUserTypes = ["invalid"];
  // if the user tries to use an unsupported usertype let them know
  if (supportedUserTypes.includes(usertype) == false) {
    throw `There is no user type of '${usertype}'. Add it to the user data object or choose another.`;
  }
}

async function assertFocusElementName(actual, expected) {
  return await assert.equal(
    actual,
    expected,
    `The element which has focus on the page has the name attribute of '${actual}' but was expected to have a value of '${expected}'.`
  );
}

async function assertErrorMessage(actual, expected) {
  return await assert.equal(
    actual,
    expected,
    `The error message says '${actual}' but was expected to have a value of '${expected}'.`
  );
}

module.exports = {
  assertTitle,
  assertUserType,
  assertInputField,
  assertFocusElementName,
  assertErrorMessage
};
