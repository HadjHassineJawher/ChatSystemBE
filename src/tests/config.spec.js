const Client = require("../database/models/client");

/**
 * Clean up the database before starting any tests...
 */

before((done) => {
  Client.deleteMany({}, function (err) {});
  done();
});

/**
 * Clean up the database after all tests...
 */

after((done) => {
  Client.deleteMany({}, function (err) {});
  done();
});
