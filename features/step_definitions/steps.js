const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const { until, By } = require("selenium-webdriver");

Given("I am on the {string} page", async function(page) {
  // assertion vars
  var actual;
  var expected;

  // hook this up to page object factory later
  this.page = page;

  switch (this.page) {
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
    case "online banking":
      // define vars that will be put in page object later
      // page title
      const pageTitle2 = "Sign in to Online Banking";
      // page url
      const pageUrl2 = "https://digital.wsecu.org/banking/signin";
      // page locator
      const pageLocator2 = "widget-wsecu-login-ng-3045441";

      // wait for page to load
      await this.driver.get(pageUrl2);
      await this.driver.wait(
        until.elementLocated(By.css(`div[data-pid=${pageLocator2}]`)),
        4000
      );

      // set assertion vars
      actual = await this.driver.getTitle().then(function(returnedData) {
        return returnedData;
      });
      expected = pageTitle2;

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

When("I log in with an {string} user", async function(username_type) {
  var actual;
  var expected;
  console.log("right here yo", this.page);

  if (username_type === "invalid") {
    this.failed_login = true;
    this.username = this.userData.invalid_user.username;
  }

  //var username;

  // need to check if page is active from previous step before doing more
  // add page object logic here
  switch (this.page) {
    case "landing":
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

      this.previous_page_redirect = true;

      break;
    case "online banking":
      console.log("online bankings");
      await this.driver.sleep(1000);

      var input_element = await this.driver.findElement({
        css: "input[name='username']"
      });
      //await this.driver.sleep(1000);
      //await input_element.click();
      await input_element.sendKeys(this.username);
      //await this.driver.sleep(1000);

      console.log("end of username");

      var input_element_password = await this.driver.findElement({
        css: "input[name='password']"
      });

      //await this.driver.sleep(1000);
      //await input_element_password.click();
      //await this.driver.sleep(1000);
      await input_element_password.sendKeys(this.username);
      //await this.driver.sleep(1000);

      console.log("end of password");

      var sign_in_button = await this.driver.findElement({
        css: "button[type='submit']"
      });

      await sign_in_button.click();

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

Then("I see the {string} page", async function(page) {
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

Then("I see the input fields have been auto-populated", async function() {
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

    if (this.previous_page_redirect) {
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
  }
});

Then("I see an error message", async function() {
  console.log("this.page", this.page);
  var actual;
  var expected;
  console.log("before switch");
  switch (this.page) {
    case "online banking":
      console.log("top");

      await this.driver.sleep(2000);

      let error_message = await this.driver.wait(
        //until.elementLocated(By.className("login-alert-dialog")),
        until.elementLocated(By.css(".login-alert-dialog div")),
        5000
      );
      console.log("123", error_message);

      let temp = await error_message.getText();
      console.log("345", temp);

      let actual1 = temp;
      let expected1 = "Sorry, incorrect username.";

      await assert.equal(
        actual1,
        expected1,
        `The expected error message of ${expected1} did not match the actual error message of ${actual1}.`
      );

      break;
    default:
      console.log("default");
      assert.fail(
        "This step requires a prior step to set the page context. No page has been defined yet."
      );
  }
});
