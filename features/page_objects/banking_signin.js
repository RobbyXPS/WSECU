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
    // Todo (reast): figure out why I can't use element names to get input
    this.usernameFieldInput = "widget-wsecu-login-ng-3045441-username";
    this.passwordField = "input[name='password']";
    // Todo (reast): figure out why I can't use element names to get input
    this.passwordFieldInput = "widget-wsecu-login-ng-3045441-password";
    this.logInButton = "button[type='submit']";
    this.errorMessage = ".login-alert-dialog div";
  }

  // navigates to the url of the specified page object url property & wait for it to load
  async navigateTo() {
    await this.driver.get(this.pageUrl);
    await this.driver.wait(
      until.elementLocated(By.css(`div[data-pid=${this.pageLocator}]`)),
      this.defaultTimeout
    );
  }

  // this page has a loading spinner that animates for a few seconds, this is a helper method to wait for it to disapear
  async waitForLoadingAnimation() {
    var i = 0;
    var isVisible;
    do {
      var isVisible = await this.driver
        .wait(
          until.elementLocated(By.className(this.loader)),
          this.defaultTimeout
        )
        .isDisplayed();
      i++;
      // the anmiation still needs a second to disapear after the attribute returns false
      await this.driver.sleep(1000);
      // keep running loop if element is visible, timeout after 100 tires if it never disapears
    } while (i < 100 && isVisible === true);
  }

  async fillInUsername(username) {
    await this.driver
      .wait(
        until.elementLocated(By.css(this.usernameField)),
        this.defaultTimeout
      )
      .sendKeys(username);
  }

  async getUsernameFieldValue() {
    return await this.driver
      .wait(
        until.elementLocated(By.id(this.usernameFieldInput)),
        this.defaultTimeout
      )
      .getAttribute("value");
  }

  async fillInPassword(password) {
    await this.driver
      .wait(
        until.elementLocated(By.css(this.passwordField)),
        this.defaultTimeout
      )
      .sendKeys(password);
  }

  async getPasswordFieldValue() {
    return await this.driver
      .wait(
        until.elementLocated(By.id(this.passwordFieldInput)),
        this.defaultTimeout
      )
      .getAttribute("value");
  }

  async getErrorMessage() {
    return await this.driver
      .wait(
        until.elementLocated(By.css(this.errorMessage)),
        this.defaultTimeout
      )
      .getText();
  }

  async clickLogInButton() {
    await this.driver
      .wait(until.elementLocated(By.css(this.logInButton)), this.defaultTimeout)
      .click();
  }

  async logIn(username, password) {
    await this.waitForLoadingAnimation();
    await this.fillInUsername(username);
    await this.fillInPassword(password);
    await this.clickLogInButton();
  }
}

module.exports = BankingSigninPage;
