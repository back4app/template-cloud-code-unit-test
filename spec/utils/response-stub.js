const EventEmitter = require('events');
/**
 * Wrapper around response stub. Simplifies testing cloud functions that
 * employ a response parameter
 */
function ResponseStub () {
  this.responseListener = new EventEmitter();
  this.responseStub = {};
  /**
   * Success method that cloud functions expect
   */
  this.responseStub.success = (resp) => {
    this.responseListener.emit("success", resp);
  }
  /**
   * Error method that cloud functions expect
   */
  this.responseStub.error = (resp) => {
    this.responseListener.emit("error", resp);
  }
  /**
   * Listens for errors and successes from stub and returns Promise that resolves or rejects accordingly
   */
  this.resolver = new Promise((resolve, reject) => {
    this.responseListener.on("success", (resp) => resolve(resp));
    this.responseListener.on("error", (err) => reject(err));
  });
}

/**
 * reeturns stub to feed to cloud function
 */
ResponseStub.prototype.getStub = function () {
  return this.responseStub;
}

/**
 * returns promise that will indicate the success or failure
 */
ResponseStub.prototype.onComplete = function () {
  return this.resolver;
}

module.exports = ResponseStub;
