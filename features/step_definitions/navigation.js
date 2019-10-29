const { Given, When, Then } = require("cucumber");
const PageCreator = require("../support/page_creator");
const AssertHelpers = require("../support/assertion_helpers");

Given("I am on the {string} page", { timeout: 3 * 4000 }, async function(
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
