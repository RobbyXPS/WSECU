const assert = require("assert");
const { Given, When, Then } = require("cucumber");

Given("navigate to google", async function() {
  await this.driver.get("http://www.google.com");
});
