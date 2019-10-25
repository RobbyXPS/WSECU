const { Builder, By, Key, until } = require("selenium-webdriver");

async function main() {
  let driver = await new Builder().forBrowser("firefox").build();

  await driver.get("http://www.google.com/ncr");

  const element = await driver.findElement(By.name("q"));

  await element.sendKeys("webdriver", Key.RETURN);
  await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
  await driver.quit();
}
main();
