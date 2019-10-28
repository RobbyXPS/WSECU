var { setWorldConstructor } = require("cucumber");
var sharedData = require("../shared-objects/test-data");

// custom world object that is available throughout scenarios
function CustomWorld() {
  // add data from external source to world object for steps to access easily
  this.userData = sharedData;
}

setWorldConstructor(CustomWorld);
