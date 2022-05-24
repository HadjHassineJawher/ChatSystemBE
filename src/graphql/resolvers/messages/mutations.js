const messages = require("../../../database/models/messages");
const { UpdateChatRoomMessage } = require("../chatRoom/mutations");

/**
 * * Create a New Message.
*/

const CreateMessage = async (args, req) => {
    // * Generating Date Time .
    const date = new Date();
    const Time = date.getHours() +":" + date.getMinutes() + " min" ;

    const message = new messages({
        "chatRoom": args.input.chatRoom,
        "from": args.input.from,
        "body":args.input.body,
        "time":Time
    });

    try {
        const result = await message.save();
        var informationtoUpdate = {
        id: result.chatRoom,
        idMessage : result._id
        }
        const ChatRoomMess = await UpdateChatRoomMessage(informationtoUpdate)
        return result;
    } catch (err) {
        throw err;
    }
};


/**
 * ! Delete Message.
*/
const DeleteMessage = async (args, req) => {
    const idMessage = args._idMessage;
    try {
        const res = await messages.findByIdAndDelete({ _id: idMessage }, { new: true })
        return("Message Deleted Successfully .")
    } catch (err) {
        console.log(err)
        return new GraphQLError("Something whent Wrong while deleting message !");
        
    }
}

/**
 * * Update Message.
*/

const UpdateMessage = async (args, req) => {
    const idMessage = args._idMessage;
    const message = args.messageBody;

    // * Generating Date Time .
    const date = new Date();
    const Time = date.getHours() + " :" + date.getMinutes() + " min" ;

    const newMessage = {
        body: message,
        time : Time
    }

    try {
        const res = await messages.findByIdAndUpdate({ _id: idMessage },{$set:newMessage}, { new: true })
        // console.log(res);
        return("Message Updated Successfully .")
    } catch (err) {
        console.log(err)
        return new GraphQLError("Something whent Wrong while Updating message !");
    }
}

module.exports = {CreateMessage,UpdateMessage,DeleteMessage};