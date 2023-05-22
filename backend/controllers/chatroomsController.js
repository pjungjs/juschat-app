const express = require('express');
const chatrooms = express.Router();
const membersController = require("./membersController.js");
const { 
  getAllChatrooms,
  getOneChatroom,
  createChatroom,
  deleteChatroom,
  updateChatroom
} = require('../queries/chatrooms.js');

chatrooms.use("/:chatroomId/members", membersController);

//index route
chatrooms.get('/', async (req, res) => {
  const allChatrooms = await getAllChatrooms();

  if (allChatrooms.success) {
    res.status(200).json(allChatrooms.payload);
  } else {
    res.status(400).json({ error: `chatrooms, index route error. ${allChatrooms.payload}` });
  }
})

//show route by id
chatrooms.get('/:id', async (req, res) => {
  const { id } = req.params;
  const oneChatroom = await getOneChatroom(id);

  if (oneChatroom.success) {
    res.status(200).json(oneChatroom.payload);
  } else {
    res.status(400).json({ error: `chatrooms, show route error. ${oneChatroom.payload}` });
  }
})

//create route
chatrooms.post('/', async (req, res) => {
  const newChatroom = req.body;
  const createdChatroom = await createChatroom(newChatroom);

  if (createdChatroom.success) {
    res.status(200).json(createdChatroom.payload);
  } else {
    res.status(400).json({ error: `chatrooms, create route error. ${createdChatroom.payload}` });
  }
})

//delete route
chatrooms.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedChatroom = await deleteChatroom(id);

  if (deletedChatroom.success) {
    res.status(200).json(deletedChatroom.payload);
  } else {
    res.status(400).json({ error: `chatrooms, delete route error. ${deletedChatroom.payload}` });
  }
})

//update route
chatrooms.put('/:id', async (req, res) => {
  const { id } = req.params;
  const editChatroom = req.body;
  const updatedChatroom = await updateChatroom(id, editChatroom);

  if (updatedChatroom.success) {
    res.status(200).json(updatedChatroom.payload);
  } else {
    res.status(400).json({ error: `chatrooms, update route error. ${updatedChatroom.payload}` });
  }
})


module.exports = chatrooms;