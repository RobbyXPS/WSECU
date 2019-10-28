const BasePage = require("./base");
const { until, By } = require("selenium-webdriver");

class BankingSigninPage extends BasePage {
  constructor(driver) {
    // bring in parent class driver reference & set unique page property values
    super(driver);
    this.pageUrl = "https://digital.wsecu.org/banking/signin";
    this.pageTitle = "Sign in to Online Banking";
    this.pageLocator = "widget-wsecu-login-ng-3045441";
  }

  // navigates to the url of the specified page object url property & wait for it to load
  async navigateTo() {
    await this.driver.get(this.pageUrl);
    await this.driver.wait(
      until.elementLocated(By.css(`div[data-pid=${this.pageLocator}]`)),
      4000
    );
  }
}

module.exports = BankingSigninPage;
