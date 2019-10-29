const { Given, When, Then } = require("cucumber");
const PageCreator = require("../support/page_creator");
const AssertHelpers = require("../support/assertion_helpers");
/*
Given("I am on the {string} page", { timeout: 3 * 5000 }, async function(
  pageRef
) {
  // set world page context if later steps need it
  this.page = pageRef;

  // create the page object based off the human readable string
  var page = await PageCreator(this.driver, this.page);

  // load the page
  await page.navigateTo();
  await page.getCurrentTitle();

  // verify that you are on the correct page
  await AssertHelpers.assertTitle(
    this.page,
    await page.getCurrentTitle(),
    page.pageTitle
  );
});
*/

When("I log in with an {string} user", { timeout: 10 * 5000 }, async function(
  username_type
) {
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
/*
Then("I see that I am on the {string} page", async function(pageRef) {
  // set world page context if later steps need it
  this.page = pageRef;

  // create the page object based off the human readable string
  var page = await PageCreator(this.driver, this.page);

  // verify that you are on the correct page
  await page.getCurrentTitle();
  await AssertHelpers.assertTitle(
    this.page,
    await page.getCurrentTitle(),
    page.pageTitle
  );
});
*/

/*
Then("I see the input fields have been auto-populated", async function() {
  // create the page object based off the page set in a prior step
  var page = await PageCreator(this.driver, this.page);

  // the only logic we know of for auto-populating is failed login so we will do that check from world object
  if (this.failed_login) {
    // check that username field has value entered from previous page
    await AssertHelpers.assertInputField(
      await page.getUsernameFieldValue(),
      this.username
    );

    // check that password field is empty because the user hasn't entered it
    await AssertHelpers.assertInputField(
      await page.getPasswordFieldValue(),
      ""
    );
  }

  // the only logic we know of for auto-focus is failed login so we will do that check from world object
  if (this.expect_focus_from_redirect) {
    // verify that the password field is focused by default
    await AssertHelpers.assertFocusElementName(
      await page.getFocusedElementName(),
      "password"
    );
  }
});
*/

/*
Then("I see an error message", async function() {
  // create the page object based off the page set in a prior step
  var page = await PageCreator(this.driver, this.page);

  // verify that the error message says the correct thing
  await AssertHelpers.assertErrorMessage(
    await page.getErrorMessage(),
    "Sorry, incorrect username."
  );
});
*/
