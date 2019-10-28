const BasePage = require("./base");
//const { until, By } = require("selenium-webdriver");

class LandingPage extends BasePage {
  constructor(driver) {
    // bring in parent class driver reference & set unique page property values
    super(driver);
    this.pageUrl = "https://wsecu.org/";
    this.pageTitle = "The Credit Union for Washington | WSECU";
    this.pageLocator = "hero-container";
  }
}

module.exports = LandingPage;
