const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User Name is required"],
    unique: [true, "User Name is not valid"],
    minlength: 6,
    maxlength: 14,
  },
  Email: {
    type: String,
    required: [true, "E-mail is required"],
    unique: [true, "Email is not valid"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "E-mail is not valid",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    unique: [true, "password in not valid"],
    validate: {
      validator: function (passwordIsvalid) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(passwordIsvalid);
      },
      message:
        "Password must contain at least between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
    },
  },
  message: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Message",
  },
});
Schema.pre("save", async function () {
  const createdUser = this;
  const hashed = await bcrypt.hash(createdUser.password, 10);
  createdUser.password = hashed;
  console.log("this is presave");
});
const User = mongoose.model("User", Schema);
module.exports = User;
