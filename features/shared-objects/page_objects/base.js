class BasePage {
  constructor(driver) {
    this.driver = driver;
    //this.webdriver = webdriver;
    //this.mytestname = "heyoh its a name";
    //this.pageTitle = "youNeedToSetAPageTitle";
    //this.pageUrl = "https://wsecu.org/";
    this.pageUrl = "youNeedToSetAPageUrl";
    //this.pageLocator = "hero-container";
  }

  async navigateTo() {
    await this.driver.get(this.pageUrl);
  }

  async url() {
    return await this.driver.getTitle();
  }
}

module.exports = BasePage;
