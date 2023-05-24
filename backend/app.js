// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const usersController = require("./controllers/usersController.js");
const messagesController = require("./controllers/messagesController.js");
const chatroomsController = require("./controllers/chatroomsController.js");
const membersController = require("./controllers/membersController.js");

app.use("/users", usersController);
app.use("/messages", messagesController);
app.use("/chatrooms", chatroomsController);
app.use("/members", membersController);

// ROUTES
app.get("/", (_, res) => {
  res.status(200).send("Welcome to JusChat!");
})

app.get("*", (_, res) => {
  res.status(404).send("Page Not Found!");
})

// EXPORT
module.exports = app;