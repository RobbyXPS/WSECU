const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const { until, By, element } = require("selenium-webdriver");

class OnlineBankingPage {
  constructor() {
    this.title = "My Page";
    this.pageTitle = "Sign in to Online Banking1";
    webdriver;
    driver;
  }

  testfunction() {
    return "yep";
  }

  async getCurrentTitle(driver) {
    console.log("inside func 1", driver);
    console.log("inside func 2", webdriver);
    await driver.getTitle().then(function(returnedData) {
      return returnedData;
    });
  }
}

module.exports = OnlineBankingPage;

// functionality to be added

/*
Given("I see the {string} page", async function(page) {
  // assertion vars
  var actual;
  var expected;
  var pageTitle;
  var pageLocator;

  const superpage = new OnlineBankingPage();
  console.log("super", superpage.testfunction());

  // hook this up to page object factory later
  this.page = page;

  switch (page) {
    case "landing":
      // define vars that will be put in page object later
      // page title
      pageTitle = "The Credit Union for Washington | WSECU";
      // page locator
      pageLocator = "hero-container";

      // wait for page to load
      await this.driver.wait(
        until.elementLocated(By.className(pageLocator)),
        4000
      );

      // set assertion vars
      actual = await this.driver.getTitle().then(function(returnedData) {
        return returnedData;
      });
      expected = pageTitle;

      // verify the correct page is loaded
      await assert.equal(
        actual,
        expected,
        `The expected ${page} page title of ${expected} did not match the actual title of ${actual}.`
      );
      break;
    case "online banking":
      // define vars that will be put in page object later
      // page title
      pageTitle = "Sign in to Online Banking";
      // page locator
      pageLocator = "hero-container";

      await this.driver.sleep(3000);

      var loader = await this.driver.findElement({
        css: ".loader"
      });
      await this.driver.wait(until.elementIsNotVisible(loader));

      var password = await this.driver.findElement({
        css: "input[name='password']"
      });

      await password.sendKeys("yo");

      await this.driver.sleep(3000);

      break;
    default:
      actual = page;
      expected = undefined;
      await assert.equal(
        actual,
        expected,
        `There is no page defined as ${page}. Add it to the step definition or choose another.`
      );
  }
});


*/
