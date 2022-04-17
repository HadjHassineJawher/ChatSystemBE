const chatRoom = require("../../../database/models/chatRoom");

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
      return chatroom;
    } catch (err) {
      throw err;
    }
  };
  

  module.exports = {
    ChatRoomList,
    ChatRoombyID,
  };
  