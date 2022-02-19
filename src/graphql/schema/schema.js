const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Client {
      _id :ID!
      username: String!
      age: Int!
      email: String!
      phone: String!
      password: String!
      contacts: [Client!]!
      is_active: Boolean!
      createdAt: String!
      updatedAt: String!
    }

    input clientInupt {
      username: String!
      age: Int!
      email: String!
      phone: String!
      password: String!
    }

    type queries {
      ClientList: [Client!]!
    }

    type mutations {
      CreateClient(input: clientInupt): Client!
    }

    schema {
      query : queries
      mutation : mutations
    }
`);
