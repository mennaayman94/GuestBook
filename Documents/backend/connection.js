const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { LINK, DB_HOST, PORT } = require("./configuration");
mongoose.connect(
  DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(err);
      process.exit();
    }
    console.log("Connected Successfully to DataBase");
    app.listen(PORT, () => {
      console.log("server listening on port" + PORT + "at link" + LINK);
    });
  }
);
module.exports = app;
