const client = require("../../../database/models/client");
const messages = require("../../../database/models/messages");

/**
 * ? Get Messages by ChatRoom ID.
*/
const MessagesbyChatRoomID = async ({_Id}) => {
    try {
        const result = await messages.find({ chatRoom: _Id });
         return result.map((messagesList) => {
            return transormData(messagesList)
        })
    } catch (err) {
        throw err;
    }
};


/**
 * * Getting all Messages.
*/

const GetMessages = async (args, req) => {
    try {
        const res = await messages.find();
        return res.map((messagesList) => {
            return transormData(messagesList)
        })
        
    } catch (err) {
        console.log(err)
    }
}

// ? Merging The Clients & Messages Collections.
const transormData = (messages) => {
    return {
        ...messages._doc,
        from: searchUser.bind(this,messages._doc.from)
    }
}

// ? Searching for a Client.
const searchUser = async (user_id) => {
    try {
        const user = await client.find({ _id: { $in: user_id } })
        return(user)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {MessagesbyChatRoomID,GetMessages};