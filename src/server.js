const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const resolvers = require("./graphql/resolvers/index.js");
const schema = require("./graphql/schema/schema.js");
const app = express();
require("./database/index");
require("dotenv").config({ path: "./src/.env" });
const SERVER_PORT = process.env.SERVER_PORT;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
// http://192.168.34.23:4200/graphql
// '192.168.1.14'

// SERVER_PORT
const server = app.listen(SERVER_PORT,() => {
    console.log("Server is working Fine Dude .. 💪");
    console.log("Visit : http://localhost:4200/graphql");
});

module.exports = server;