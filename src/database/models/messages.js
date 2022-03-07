
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        chatRoom: {type: Schema.Types.ObjectId, ref: "ChatRooms", require:true} ,
        from: {type: Schema.Types.ObjectId, ref: "Clients", require:true},
        body: {type: String, require: true},
        time: {type: String, require: true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Messages", MessageSchema);