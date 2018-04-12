// main.js
var cloudFunctions = require("./cloud-functions");
// Note that we are injecting the Parse instance, which is automatically supplied in the
// context of Parse Cloud Code, but not on local tests
Parse.Cloud.define("signuserUp", cloudFunctions.SignupUser(Parse));
