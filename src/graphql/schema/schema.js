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

    type clientauth{
      token: String!
      refreshtoken:String!
    }

    type queries {
      ClientList: [Client!]!
      ClientLogin(email:String!,password:String!):clientauth!
    }

    type mutations {
      CreateClient(input: clientInupt): Client!
    }

    schema {
      query : queries
      mutation : mutations
    }
`);
