const LandingPage = require("../shared-objects/page_objects/landing");
const BankingSigninPage = require("../shared-objects/page_objects/banking_signin");

async function pageCreator(driver, pageName) {
  switch (pageName) {
    case "landing":
      return await new LandingPage(driver);
      break;
    case "banking singin":
      return await new BankingSigninPage(driver);
      break;
    default:
      throw `There is no page defined as ${pageName}. You may need to add it to the page creator, choose another name that supported, or run a prior step that sets which page your on.`;
  }
}

module.exports = pageCreator;
