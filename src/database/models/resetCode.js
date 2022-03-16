const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetCodeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Clients", require: true },
    email: {
      type: String,
      require: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    resetcode: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Codes", ResetCodeSchema );