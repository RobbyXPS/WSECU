const { Given, When, Then } = require("cucumber");
const PageCreator = require("../support/page_creator");
const AssertHelpers = require("../support/assertion_helpers");

When("I log in with an {string} user", async function(username_type) {
  // check that the user supplied a valid usertype
  await AssertHelpers.assertUserType(username_type);

  // set user state for invalid user tests
  if (username_type === "invalid") {
    this.failed_login = true;
    this.username = this.userData.invalid_user.username;
    this.password = this.userData.invalid_user.password;
  }

  // create the page object based off the human readable string
  var page = await PageCreator(this.driver, this.page);

  // login from this page
  await page.logIn(this.username, this.password);

  // set world state signifying a redirect happened, future steps need to know this info (e.g. focused input by default)
  switch (this.page) {
    case "landing":
      this.expect_focus_from_redirect = true;
      break;
    default:
      this.expect_focus_from_redirect = false;
  }
});
