var { setWorldConstructor } = require("cucumber");
var sharedData = require("../shared-objects/test-data");

// custom world object that is available throughout scenarios
function CustomWorld() {
  this.userData = sharedData;
}

setWorldConstructor(CustomWorld);
