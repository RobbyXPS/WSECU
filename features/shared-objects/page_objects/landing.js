const BasePage = require("./base");
const { until, By } = require("selenium-webdriver");

class LandingPage extends BasePage {
  constructor(driver) {
    // bring in parent class driver reference
    super(driver);
    //this.driver = driver;
    //this.mytestname = "land ahead";
    this.pageTitle = "The Credit Union for Washington | WSECU";
    this.pageUrl = "https://wsecu.org/";
    //this.pageUrl = "https://espn.com";
    this.pageLocator = "hero-container";
  }

  async navigateToPage() {
    console.log("inside class drive", this.driver);
    await this.driver.get(this.pageUrl);
    await console.log("p1", this.pageLocator);
    await this.driver.wait(
      until.elementLocated(By.className(this.pageLocator)),
      4000
    );
    await console.log("p2 - all done");
  }
}

module.exports = LandingPage;
