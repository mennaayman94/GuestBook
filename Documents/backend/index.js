const express = require("express");
const app = require("./connection");
require("./configuration");
const UserRouter=require("./Api/createacountandlogin")
app.use(express.json());
app.use("/users",UserRouter);
app.use(function (error, req, res, next) {
  console.log(error.message);
  if (req.statusCode <= 500) {
    res.json({ message: error.message });
  }

  res.status(500).send("Internal server error");
});
