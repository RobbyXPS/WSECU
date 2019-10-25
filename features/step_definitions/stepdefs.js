const assert = require("assert");
const { Given, When, Then } = require("cucumber");

function isItFriday(today) {
  // We'll leave the implementation blank for now
  if (today === "Friday") {
    return "TGIF";
  } else {
    return "Nope";
  }
}

Given("today is {string}", function(givenDay) {
  this.today = givenDay;
});

When("I ask whether it's Friday yet", function() {
  // Write code here that turns the phrase above into concrete actions
  this.actualAnswer = isItFriday(this.today);
});

Then("I should be told {string}", function(expectedAnswer) {
  // Write code here that turns the phrase above into concrete actions
  assert.equal(this.actualAnswer, expectedAnswer);
});
