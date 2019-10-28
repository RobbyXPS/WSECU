const LandingPage = require("../shared-objects/page_objects/landing");
const BankingSigninPage = require("../shared-objects/page_objects/banking_signin");

async function pageCreator(driver, pageName) {
  switch (pageName) {
    case "landing":
      return await new LandingPage(driver);
      break;
    case "online banking":
      return await new BankingSigninPage(driver);
      break;
    default:
      throw `There is no page defined as ${pageName}. Add it to the page creator or choose another.`;
  }
}

module.exports = pageCreator;
