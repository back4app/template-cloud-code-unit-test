
// Hook into your testing server
var Parse = require('parse/node');
var constants = require("./constants");
// head over to your Parse dash board for your test server, and grab your keys. Swap out the strings with the place holders below
Parse.initialize(constants.APPLICATION_KEY, null, constants.MASTER_KEY);
// if you are running a localhost Parse server, set the serverUrl accordingly
Parse.serverURL = 'https://parseapi.back4app.com'
var signupUser = require("../cloud/cloud-functions").SignupUser(Parse);
var purgeTable = require("./utils/purge-parse-table")(Parse);
var ResponseStub = require("./utils/response-stub");

describe("SignupUser", ()=> {
  beforeEach((done) => {
    /// purge the user and profile tables, and then proceed
    Promise.all([purgeTable("User"), purgeTable("Profile")])
    .catch((e) => fail(e))
    .then(() => done());
  });
  it ("should reject a request to signup that does not contain all the parameters", (done) => {
    var responseStub = new ResponseStub();
    responseStub.onComplete()
    .then(() => fail("Should have failed due to invalid parameters"))
    .catch((e) => {})
    .then(() => done());

    signupUser({ params : {}}, responseStub.getStub());

  });

  it ("should signup a User, and also create a Profile that contains a reference to the user", (done) => {
      var responseStub = new ResponseStub();
      var stub = responseStub.getStub();
      responseStub.onComplete()
      .then((resp) => {
        var profileQ =  new Parse.Query("Profile");
        profileQ.equalTo("lastname", "Smith");
        return profileQ.find({useMasterKey : true});
      })
      // Check to make sure the profile we retrieve is valid
      .then((profiles) => {
        if (profiles.length === 0) throw new Error("No profile's found");
        expect(profiles[0].get('firstname')).toBe("John");
        // get the corresponding user
        return profiles[0].get("user").fetch({useMasterKey : true})
      })
      // Check to make sure the user is what we expect
      .then((user) => {
        expect(user.getUsername()).toBe("jsmith1");
      })
      .catch((e) => {
        console.log(e)
        fail(e);
      })
      .then(() => done());

      signupUser({
        params : {
          firstname : "John",
          lastname : "Smith",
          email : "jsmith@example.com",
          username : "jsmith1",
          password : "SecretCatchphrase1"
        },
      },
      stub
    );

    })
});
