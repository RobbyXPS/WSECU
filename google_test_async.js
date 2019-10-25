const { Builder, By, Key, until } = require("selenium-webdriver");

async function main(browser) {
  const myBrowser = browser;

  let driver = await new Builder().forBrowser(`${myBrowser}`).build();

  await driver.get("http://www.google.com/ncr");

  const element = await driver.findElement(By.name("q"));

  await element.sendKeys("webdriver", Key.RETURN);
  await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
  await driver.quit();
}

main("firefox");
//main("chrome");
