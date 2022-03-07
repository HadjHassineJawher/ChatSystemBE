const messages = require("../../../database/models/messages");

/**
 * Create a New Message.
*/

const CreateMessage = async (args, req) => {

    const message = new messages({
        "chatRoom_Id": args.input.chatRoom_Id,
        "from": args.input.from,
        "body":args.input.body,
        "time":args.input.time,
    });

    try {
        const result = await message.save();
        return result;
    } catch (err) {
        throw err;
    }
};



module.exports = {CreateMessage};