const clientMutations = require("./clients/mutations");
const messageMutations = require("./messages/mutations");

const clientQueries = require("./clients/queries");
const messageQueries = require("./messages/queries");

const reslovers = {
  ...messageMutations,
  ...clientMutations,
  ...messageQueries,
  ...clientQueries,
};

module.exports = reslovers;
