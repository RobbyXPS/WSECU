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
      4000
    );
  }

  // obtains the title of the current page's tab
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
  /*

    var currently_focused_input = await this.driver.findElement({
      css: "input:focus"
    });
    var currently_focused_input = await this.driver.findElement({
      css: "*:focus"
    });
    console.log("inside 1", currently_focused_input);
    var currently_focused_input_name = await currently_focused_input.getAttribute(
      "name"
    );
    console.log("inside 2", currently_focused_input_name);
    return await currently_focused_input_name;
    
  }
  */
}

module.exports = BasePage;
