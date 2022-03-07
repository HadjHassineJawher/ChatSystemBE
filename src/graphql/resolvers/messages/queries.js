const messages = require("../../../database/models/messages");

/**
 * Get Messages by ChatRoom ID.
*/
const MessagesbyChatRoomID = async ({_Id}) => {
    try {
        const result = await messages.find({chatRoom_Id:_Id});
        console.log(result)
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {MessagesbyChatRoomID};