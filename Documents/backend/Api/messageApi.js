const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration");
const MessageRouter = express.Router();
const Message = require("../models/message");
MessageRouter.use(function (req, res, next) {
  console.log("Time:", Date.now());
  console.log(req.url);
  console.log("Request Type:", req.method);
  next();
});
//Write message
MessageRouter.post("/add", async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    // jwt.verify(token, JWT_SECRET, function (err, decoded) {
    //   const userid = decoded._id;
    //   if (err) {
    //     res.send("invalid token");
    //   }
    const {
      body: { title, body },
    } = req;
    const newMessage = new Message({
      body,
      title,
    });
    const createdMessage = await newMessage.save();
    res.status(201).send(createdMessage.toJSON());
  } catch (error) {
    next(err);
  }
});
//delete message
MessageRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    // jwt.verify(token, JWT_SECRET, function (err, decoded) {
    //   if (err) {
    //     res.send("invalid token");
    //   } else {
    await Message.findByIdAndDelete(
      { _id: req.params.id },
      async (err, data) => {
        if (err) {
          return next(err);
        } else {
          const messages = await Message.find();
          res.send(messages);
        }
      }
    );
  } catch (err) {
    next(err);
  }
});
//edit message
MessageRouter.patch("/edit/:id", async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    // jwt.verify(token, JWT_SECRET, function (err, decoded) {
    //   const userid = decode_id;
    //   if (err) {
    //     res.send("invalid token");
    //   } else {
    const update = {
      title: req.body.title,
      body: req.body.body,
    };
    await Message.findByIdAndUpdate({ _id: req.params.id }, update).exec();

    const messages = await Message.find();

    res.send(messages);
  } catch (error) {
    next(error);
  }
});
//get users messages
MessageRouter.get("/:userid", async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    // jwt.verify(token, JWT_SECRET, (err, decoded) => {
    //   userid = decoded._id;
    //   if (err) {
    //     res.send("invalid token");
    //   }
    await Message.find(
      { userid: userid },
      { title: 1, body: 1, createdAt: 1 }
    ).exec((err, data) => {
      if (err) {
        return next(err);
      }
      res.send(data);
    });
  } catch (error) {
    next(error);
  }
});
//get all messages
MessageRouter.get("/", async (req, res, next) => {
  try {
    await Message.find({}, { title: 1, body: 1, createdAt: 1 }).exec(
      (err, data) => {
        if (err) {
          return next(err);
        }
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});
module.exports = MessageRouter;
