const { After, Before } = require("cucumber");
const { Builder } = require("selenium-webdriver");

// hook that runs before the first step of each sceanrio
Before(async function() {
  // instantiate the webdriver and make it available through the world object
  this.driver = new Builder().forBrowser("firefox").build();
});

// hook that runs after the last step of each sceanrio
After(async function() {
  // clean up the browser after each test
  this.driver.quit();
});
