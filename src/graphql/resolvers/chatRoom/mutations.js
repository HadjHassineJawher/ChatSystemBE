const chatRoom = require("../../../database/models/chatRoom");

/**
 * Create a New ChatRoom.
*/

const CreateChatRoom = async (args, req) => {
    
    const chatroom = new chatRoom({members:[args._id1 , args._id2]});
    try {
        const result = await chatroom.save();
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {CreateChatRoom};

