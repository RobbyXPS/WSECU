const BasePage = require("./base");
const { until, By } = require("selenium-webdriver");

class LandingPage extends BasePage {
  constructor(driver, defaultTimeout) {
    // bring in parent class references & set unique page property values
    super(driver, defaultTimeout);
    this.pageUrl = "https://wsecu.org/";
    this.pageTitle = "The Credit Union for Washington | WSECU";
    this.pageLocator = "hero-container";
    this.usernameField = "#digital-banking-username";
    this.logInButton = "input[value='Sign In']";
  }

  async fillInUsername(username) {
    // enter text into the input field once it's visible on the screen
    await this.driver
      .wait(
        until.elementLocated(By.css(this.usernameField)),
        this.defaultTimeout
      )
      .sendKeys(username);
  }

  async clickLogInButton() {
    // click the button once it's visible on the screen
    await this.driver
      .wait(until.elementLocated(By.css(this.logInButton)), this.defaultTimeout)
      .click();
  }

  async logIn(username) {
    await this.fillInUsername(username);
    await this.clickLogInButton();
  }
}

module.exports = LandingPage;
