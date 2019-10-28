const { until, By } = require("selenium-webdriver");

class BasePage {
  // define page object properties
  constructor(driver) {
    this.driver = driver;
    this.pageUrl = "https://youNeedToSetAPageUrl.com/";
    this.pageTitle = "youNeedToSetAPageUrl";
    this.pageLocator = "youNeedToSetAPageLocator";
  }

  // navigates to the url of the specified page object url property & wait for it to load
  async navigateTo() {
    await this.driver.get(this.pageUrl);
    await this.driver.wait(
      until.elementLocated(By.className(this.pageLocator)),
      4000
    );
  }

  // obtains the title of the current page's tab
  async getCurrentTitle() {
    return await this.driver.getTitle();
  }
}

module.exports = BasePage;
