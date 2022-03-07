
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema(
    {
        members: [{type: Schema.Types.ObjectId, ref: "Clients"}],
        messages: [{type: Schema.Types.ObjectId, ref: "Messages"}],
    },
    { timestamps: true }
);

module.exports = mongoose.model("ChatRooms", ChatRoomSchema);