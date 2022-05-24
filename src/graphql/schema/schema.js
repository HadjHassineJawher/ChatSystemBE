const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Client {
      _id :ID!
      username: String!
      age: String!
      email: String!
      phone: String!
      image: String!
      password: String!
      contacts: [Client!]!
      is_active: Boolean!
      createdAt: String!
      updatedAt: String!
    }

    type ChatRoom {
      _id :ID!
      members:[Client!]
      messages:[Message!]
    }

    type Message {
        _id:String!
        chatRoom: String!
        from:  [Client!]!
        body:  String!
        time:  String!
    }

    input MessageInput {
      chatRoom: String!
      from:  String!
      body:  String!
    }

    type clientauth {
      token: String!
      refreshtoken:String!
      userId:String!
    }

    input clientInupt {
      username: String!
      image: String!
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
      image: String!
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
      GetMessages:[Message!]
      ChatRoomList:[ChatRoom!]!
      ChatRoombyID(id: String!):ChatRoom!
      ChatRoombyUserId(id:String):[ChatRoom!]
    }

    type mutations {
      CreateClient(input: clientInupt): Client!
      UpdateClient(input: clientUpdateInupt):Client!
      CreateChatRoom(_id1: String,_id2: String): ChatRoom!
      CreateMessage(input: MessageInput ): Message!
      ResetCode(email:String!):String!
      ResetPassword (code:String!,newPassword:String!):String!
      DeleteMessage(_idMessage: String!):String!
      UpdateMessage(_idMessage: String!,messageBody:String!):String!
      DeleteChatRoomUser(input: chatroomUpdateUserInupt):ChatRoom!
      DeleteChatRoomMessage(input: chatroomUpdateInupt):ChatRoom!
      UpdateChatRoomMessage(input: chatroomUpdateInupt):ChatRoom!
    }

    schema {
      query : queries
      mutation : mutations
    }
`);
