const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const { until, By, element } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const OnlineBankingPage = require("../shared-objects/page_objects/online_banking");

Given("I am on the {string} page", async function(page) {
  // assertion vars
  var actual;
  var expected;

  // hook this up to page object factory later
  this.page = page;

  switch (page) {
    case "landing":
      // define vars that will be put in page object later
      // page title
      const pageTitle = "The Credit Union for Washington | WSECU";
      // page url
      const pageUrl = "https://wsecu.org/";
      // page locator
      const pageLocator = "hero-container";

      // wait for page to load
      await this.driver.get(pageUrl);
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

Given("I log in with an {string} user", async function(username_type) {
  var actual;
  var expected;
  var username;

  // need to check if page is active from previous step before doing more
  // add page object logic here
  switch (username_type) {
    case "invalid":
      username = this.userData.invalid_user.username;

      //await this.driver.sleep(4000);

      var input_element = await this.driver.findElement({
        css: "#digital-banking-username"
      });
      await input_element.sendKeys(username);

      var button_element = await this.driver.findElement({
        css: "input[value='Sign In']"
      });

      await button_element.click();

      //await this.driver.sleep(4000);

      break;
    default:
      actual = username_type;
      expected = undefined;
      await assert.equal(
        actual,
        expected,
        `There is no user type of ${username_type}. Add it to the user data object or choose another.`
      );
  }
});

//Then I see the "online banking" page

Given("I see the {string} page", async function(page) {
  var mypage;

  switch (page) {
    case "online banking":
      mypage = await new OnlineBankingPage(webdriver, this.driver);

      actual = await this.driver.getTitle().then(function(returnedData) {
        return returnedData;
      });
      expected = mypage.pageTitle;

      var testytest = await mypage.getCurrentTitle();
      await console.log("testytest", testytest);

      await assert.equal(
        actual,
        expected,
        `The expected ${page} page title of ${expected} did not match the actual title of ${actual}.`
      );
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

  //  const mypage = await new OnlineBankingPage();

  await this.driver.sleep(3000);

  //console.log("work?", superpage.pageTitle);

  //await this.driver.sleep(3000);
});
