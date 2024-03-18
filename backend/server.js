const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRouter = require("./router/todoRouter");

const server = express();
const port = process.env.PORT || 8000; //enviroment variables
const connectionStr = process.env.Mongo_URI;

//connecting to mongodb
mongoose
  .connect(connectionStr)
  .then(console.log("Connected to TodoDB"))
  .catch((err) => {
    console.log(`error connecting to DB ${err}`);
  });

server.use(express.json()); //middlewares
server.use(cors());

server.use("/api/todos/", todoRouter);

// server listening
server.listen(port, (err) => {
  if (!err) {
    console.log(`server listening at port ${port}`);
  } else {
    console.log(err);
  }
});
