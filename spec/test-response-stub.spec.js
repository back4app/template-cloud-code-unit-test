/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package
* 2018-04-08
*/
var ResponseStub = require("./utils/response-stub");

describe("ResponseStub", ()=> {
  describe("#getStub", ()=>{
    it("should return resolving promise when success called on getStub", (done) => {
      var responseStub = new ResponseStub();
      responseStub.onComplete()
      .catch((err) => fail(err.message))
      .then(() => done());
      responseStub.getStub().success("Test success Message");
    });
    it("should return resolve promise even after timeout", (done) => {
      var responseStub = new ResponseStub();
      responseStub.onComplete()
      .catch((err) => fail(err.message))
      .then(() => done());

      setTimeout(() => {
        responseStub.getStub().success("Test success Message");
      }, 1000);
    });

    it("should reject promise when error called on getStub", (done) => {
      var responseStub = new ResponseStub();
      var stub = responseStub.getStub();

      responseStub.onComplete()
      .then(() => fail("Should have erred"))
      .catch((e) => {})
      .then(() => done());

      stub.error("Error!");
    })
  });
})
