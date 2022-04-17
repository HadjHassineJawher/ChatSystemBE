const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Client {
      _id :ID!
      username: String!
      age: String!
      email: String!
      phone: String!
      password: String!
      contacts: [Client!]!
      is_active: Boolean!
      createdAt: String!
      updatedAt: String!
    }

    type ChatRoom {
      _id :ID!
      members:[String!]
      messages:[String!]
    }

    type Message {
        chatRoom: String!
        from:  String!
        body:  String!
        time:  String!
    }

    input MessageInput {
      chatRoom: String!
      from:  String!
      body:  String!
      time:  String!
    }

    type clientauth {
      token: String!
      refreshtoken:String!
    }

    input clientInupt {
      username: String!
      age: String!
      email: String!
      phone: String!
      password: String!
    }

    input clientUpdateInupt {
      _id: String!
      username: String!
      age: String!
      email: String!
      phone: String!
    }
    
    input chatroomUpdateInupt {
      id: String!
      idMessage: String!
    }
    input chatroomUpdateUserInupt {
      id: String!
      idUser: String!
    }

    type queries {
      ClientList: [Client!]!
      ClientLogin(email:String!,password:String!):clientauth!
      ClientbyID (id:String!):Client!
      MessagesbyChatRoomID(_Id: String!): [Message!]   
      ChatRoomList:[ChatRoom!]!
      ChatRoombyID(id: String!):ChatRoom!
    }
    
    
    type mutations {
      RegisterClient(username: String, age: String, email: String, phone: String, password: String):Client!
      CreateClient(input: clientInupt): Client!
      UpdateClient(input: clientUpdateInupt):Client!
      DeleteChatRoomUser(input: chatroomUpdateUserInupt):ChatRoom!
      DeleteChatRoomMessage(input: chatroomUpdateInupt):ChatRoom!
      UpdateChatRoomMessage(input: chatroomUpdateInupt):ChatRoom!
      CreateChatRoom(_id1: String,_id2: String): ChatRoom!
      CreateMessage(input: MessageInput ): Message!
      ResetCode(email:String!):String!
      ResetPassword (code:String!,newPassword:String!):String!
    }

    schema {
      query : queries
      mutation : mutations
    }
`);
