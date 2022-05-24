const chatRoom = require("../../../database/models/chatRoom");
const client = require("../../../database/models/client");
const messages = require("../../../database/models/messages");

const ChatRoomList= async () => {
    try {
      const chatRooms = await chatRoom.find();
      return chatRooms;
    } catch (err) {
      throw err;
    }
  };

  const ChatRoombyID = async ({id}) => {
    try {
      const chatroom = await chatRoom.findById(id);
      // console.log(chatroom)
      return transormData(chatroom);
    } catch (err) {
      throw err;
    }
  };
  
const ChatRoombyUserId = async ({ id }) => {
    try {
        const userChatRoom = await chatRoom.find({ "members": { $in: { _id: id } } })
        return (userChatRoom.map((List) => {
            return transormData(List)
        }))
        
    } catch (err) {
        console.log(err)
    }
}

// ? Merging The Chatroom & Messages Collections.
const transormData = (chatRoom) => {
    // console.log(chatRoom._doc)
    return {
        ...chatRoom._doc,
      members: searchUsers.bind(this, chatRoom._doc.members),
      messages: searchLastMessage.bind(this,chatRoom._doc.messages)
    }
}

// ? Searching for a members.
const searchUsers = async (user_id) => {
    // console.log(user_id)
    try {
        const user = await client.find({ _id: user_id })
        return user.map((users) => {
            // console.log(users.username)
            return (users)
        })
    } catch (err) {
        console.log(err)
    }
}

// ? Searching for a members.
const searchLastMessage = async (mess_id) => {
    // console.log(mess_id)
    try {
      const messa = await messages.find({ _id: mess_id })
      // console.log(messa)
      return messa.map((lastMessa) => {
            return (lastMessa)
        })
    } catch (err) {
        console.log(err)
    }
}

  module.exports = {
    ChatRoomList,
    ChatRoombyID,
    ChatRoombyUserId
  };