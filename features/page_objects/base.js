const { until, By } = require("selenium-webdriver");

class BasePage {
  // define page object properties
  constructor(driver) {
    this.driver = driver;
    this.defaultTimeout = 4000;
    this.pageUrl = "https://youNeedToSetAPageUrl.com/";
    this.pageTitle = "youNeedToSetAPageUrl";
    this.pageLocator = "youNeedToSetAPageLocator";
    this.focusedElement = "*:focus";
  }

  // navigates to the url of the specified page object url property & wait for it to load
  async navigateTo() {
    await this.driver.get(this.pageUrl);
    await this.driver.wait(
      until.elementLocated(By.className(this.pageLocator)),
      this.defaultTimeout
    );
  }

  async getCurrentTitle() {
    return await this.driver.getTitle();
  }

  async getFocusedElementName() {
    return await this.driver
      .wait(
        until.elementLocated(By.css(this.focusedElement)),
        this.defaultTimeout
      )
      .getAttribute("name");
  }
}

module.exports = BasePage;
