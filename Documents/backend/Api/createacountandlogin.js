const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration");
const UserRouter = express.Router();
//middleware for logging api
UserRouter.use(function (req, res, next) {
  console.log("Time:", Date.now());
  console.log(req.url);
  console.log("Request Type:", req.method);
  next();
});
//create a user account
UserRouter.post("/register", async (req, res, next) => {
  try {
    const {
      body: { username, password, Email },
    } = req;

    const newUser = new User({
      username,
      password,
      Email,
    });

    const createdUser = await newUser.save();
    return res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});
//user login
UserRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(password, user.toJSON().password);

    if (isMatch) {
      return jwt.sign(
        { _id: user.id },
        JWT_SECRET,
        { expiresIn: "60m" },
        (err, token) => {
          return res.send({ token });
        }
      );
    } else {
      return res.send("user name or password is wrong");
    }
  } catch (error) {
    next(error);
  }
});
module.exports = UserRouter;
