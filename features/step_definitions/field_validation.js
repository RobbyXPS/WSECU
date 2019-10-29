const { Given, When, Then } = require("cucumber");
const PageCreator = require("../support/page_creator");
const AssertHelpers = require("../support/assertion_helpers");

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

  // the only logic we know of for auto-focus is failed login redirect so we will do that check from world object
  if (this.expect_focus_from_redirect) {
    // verify that the password field is focused by default
    await AssertHelpers.assertFocusElementName(
      await page.getFocusedElementName(),
      "password"
    );
  }
});
