const BasePage = require("./base");
const { until, By } = require("selenium-webdriver");

class BankingSigninPage extends BasePage {
  constructor(driver, defaultTimeout) {
    // bring in parent class driver references & set unique page property values
    super(driver, defaultTimeout);
    this.pageUrl = "https://digital.wsecu.org/banking/signin";
    this.pageTitle = "Sign in to Online Banking";
    this.pageLocator = "widget-wsecu-login-ng-3045441";
    this.loader = "loader";
    this.usernameField = "input[name='username']";
    this.passwordField = "input[name='password']";
    this.logInButton = "button[type='submit']";
  }

  // navigates to the url of the specified page object url property & wait for it to load
  async navigateTo() {
    await this.driver.get(this.pageUrl);
    //console.log("before sleep");
    //this.driver.sleep(8000);
    //this.waitForLoadingAnimation();
    //console.log("after wait");
    //this.driver.sleep(8000);
    await this.driver.wait(
      until.elementLocated(By.css(`div[data-pid=${this.pageLocator}]`)),
      this.defaultTimeout
    );
  }

  async waitForLoadingAnimation() {
    console.log("starting to wait");
    var i = 0;
    var isVisible;
    do {
      var isVisible = await this.driver
        .wait(
          until.elementLocated(By.className(this.loader)),
          this.defaultTimeout
        )
        .isDisplayed();
      console.log("wait cycle", i);
      i++;
      // the anmiation still needs a second to disapear after the attribute returns false
      await this.driver.sleep(1000);
    } while (i < 100 && isVisible === true);
  }

  async fillInUsername(username) {
    console.log("inside username", username);
    await this.driver.wait(
      until.elementLocated(By.css(this.usernameField)),
      this.defaultTimeout
    );
    var username_field = await this.driver.findElement({
      css: this.usernameField
    });
    await username_field.sendKeys(username);
  }

  async fillInPassword(password) {
    console.log("inside password", password);
    await this.driver.wait(
      until.elementLocated(By.css(this.password_field)),
      this.defaultTimeout
    );
    var password_field = await this.driver.findElement({
      css: this.password_field
    });
    await password_field.sendKeys(password);
  }

  async clickLogInButton() {
    console.log("inside button click");
    await this.driver.wait(
      until.elementLocated(By.css(this.password_field)),
      this.defaultTimeout
    );
    var log_in = await this.driver.findElement({
      css: this.logInButton
    });
    await log_in.sendKeys(password);

    /*
    //this.logInButton
    var sign_in_button = await this.driver.findElement({
      css: this.logInButton
    });
    await sign_in_button.click();


    await this.driver.wait(
      until.elementLocated(By.css(this.logInButton)),
      this.defaultTimeout
    );
    var sign_in_button = await this.driver.findElement({
      css: this.logInButton
    });
    await sign_in_button.click();
    */
  }

  async logIn(username, password) {
    console.log("staring login - un", username);
    console.log("staring login - pw", password);
    await this.waitForLoadingAnimation();
    await this.fillInUsername(username);
    await this.fillInPassword(password);
    await this.clickLogInButton();
  }
}

/*
async function waitForLoader(driver) {
        var i = 0;
        var isVisible;
        do {
          var isVisible = await driver
            .wait(until.elementLocated(By.className("loader")), 4000)
            .isDisplayed();
          i++;
          // the anmiation still needs a second to disapear after the attribute returns false
          await driver.sleep(1000);
        } while (i < 100 && isVisible === true);
      }
      await waitForLoader(this.driver);

      // fill out the username field
      await this.driver.wait(
        until.elementLocated(By.css("input[name='username']")),
        4000
      );
      var username_field = await this.driver.findElement({
        css: "input[name='username']"
      });
      await username_field.sendKeys(this.username);

      // fill out the password field
      var password_field = await this.driver.findElement({
        css: "input[name='password']"
      });
      await password_field.sendKeys(this.password);

      var sign_in_button = await this.driver.findElement({
        css: "button[type='submit']"
      });
      await sign_in_button.click();
*/

module.exports = BankingSigninPage;
