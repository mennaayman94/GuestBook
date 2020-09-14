const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = new mongoose.Schema({
  userid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  messageid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Message",
  },
  body: {
    type: String,
    required: true,
  },
});
schema.plugin(timestamps);
const MessageReply = mongoose.model("MessageReply", Schema);
module.exports = MessageReply;
