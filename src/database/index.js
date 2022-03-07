const mongoose = require("mongoose");
require("dotenv").config({ path: "./src/.env" });

const MONGO_USER = process.env.MONGO_USER;
const DATA_BASE = process.env.DATA_BASE;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;

mongoose.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.btqcx.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("ChatSystem DataBase Connection Succeeded. ");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
