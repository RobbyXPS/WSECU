const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const { until, By, element } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");

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
  //var username;

  // need to check if page is active from previous step before doing more
  // add page object logic here
  switch (username_type) {
    case "invalid":
      this.failed_login = true;
      this.username = this.userData.invalid_user.username;

      var input_element = await this.driver.findElement({
        css: "#digital-banking-username"
      });
      await input_element.sendKeys(this.username);

      await this.driver.wait(
        until.elementLocated(By.css("input[value='Sign In']")),
        4000
      );

      await this.driver.sleep(1000);
      var button_element = await this.driver.findElement({
        css: "input[value='Sign In']"
      });

      await button_element.click();

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

Given("I see the {string} page", async function(page) {
  switch (page) {
    case "online banking":
      // get actual page title
      actual = await this.driver.getTitle().then(function(returnedData) {
        return returnedData;
      });
      // set expected page title
      const pageTitle = "Sign in to Online Banking";
      expected = pageTitle;
      //make sure you are on the right page
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

  await this.driver.sleep(3000);

  //console.log("work?", superpage.pageTitle);

  //await this.driver.sleep(3000);
});

Given("the input fields have been auto-populated", async function() {
  // check input fields for string if user has failed to login in prior steps
  if (this.failed_login) {
    let username_field = await this.driver.wait(
      until.elementLocated(By.id("widget-wsecu-login-ng-3045441-username")),
      10000
    );

    var username_field_current_value = await username_field.getAttribute(
      "value"
    );
    var username_field_expected_value = this.username;

    console.log("username_field_current_value", username_field_current_value);

    //check to make sure input field is set to what was entered earlier
    await assert.equal(
      username_field_current_value,
      username_field_expected_value,
      `The expected username of ${username_field_expected_value} did not match the actual username of ${username_field_current_value}.`
    );

    let password_field = await this.driver.wait(
      until.elementLocated(By.id("widget-wsecu-login-ng-3045441-password")),
      10000
    );

    var password_field_current_value = await password_field.getAttribute(
      "value"
    );
    var password_field_expected_value = "";

    //check to make sure input field is set to what was entered earlier
    await assert.equal(
      password_field_current_value,
      password_field_expected_value,
      `Expected password value to be blank but was it was ${password_field_current_value}.`
    );

    var currently_focused_input = await this.driver.findElement({
      css: "input:focus"
    });

    var currently_focused_input_name = await currently_focused_input.getAttribute(
      "name"
    );

    //    console.log("uhhh", testy2);

    console.log("password_field_current_value", password_field_current_value);
    var current_focused = currently_focused_input_name;
    var expected_focused = "password";

    //check to make sure input field is set to what was entered earlier
    await assert.equal(
      current_focused,
      expected_focused,
      `The expected focused field of ${expected_focused} did not match the actual focused field of ${current_focused}.`
    );
  }
});
