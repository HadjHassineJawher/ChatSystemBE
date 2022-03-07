const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    username: { type: String, require: true },
    age: { type: String, min: 16, max: 65, require: true },
    email: {
      type: String,
      require: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    contacts: { type: Array, default: null },
    is_active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clients", ClientSchema);
