const clientMutations = require("./clients/mutations");
const conversationMutations = require("./chatRoom/mutations");
const messagesMutations = require("./messages/mutations");

const clientQueries = require("./clients/queries");
const conversationQueries = require("./chatRoom/queries");
const messageQueries = require("./messages/queries");

const reslovers = {
  ...conversationQueries,
  ...clientQueries,
  ...messageQueries,
  
  ...conversationMutations,
  ...clientMutations,
  ...messagesMutations,
};

module.exports = reslovers;
