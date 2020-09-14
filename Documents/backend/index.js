const express = require("express");
const app = require("./connection");
const cors= require("cors")
app.use(cors())
require("./configuration");
const UserRouter=require("./Api/createacountandlogin")
const MessageRouter= require("./Api/messageApi")
app.use(express.json());
app.use("/users",UserRouter);
app.use("/message",MessageRouter)
app.use(function (error, req, res, next) {
  console.log(error.message);
  if (req.statusCode <= 500) {
    res.json({ message: error.message });
  }
  res.status(500).send("Internal server error");
});
