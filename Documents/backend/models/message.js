const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});
Schema.plugin(timestamps);
const Message = mongoose.model("Message", Schema);
module.exports = Message;
