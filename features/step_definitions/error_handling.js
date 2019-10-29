const { Given, When, Then } = require("cucumber");
const PageCreator = require("../support/page_creator");
const AssertHelpers = require("../support/assertion_helpers");

Then("I see an error message", async function() {
  // create the page object based off the page set in a prior step
  var page = await PageCreator(this.driver, this.page);

  // verify that the error message says the correct thing
  await AssertHelpers.assertErrorMessage(
    await page.getErrorMessage(),
    "Sorry, incorrect username."
  );
});
