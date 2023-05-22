const express = require('express');
const messages = express.Router();
const { 
  getAllMessages,
  getAllMessagesByRoom,
  createMessage,
  deleteMessage,
  updateMessage
} = require('../queries/messages.js');

//index route all
messages.get('/', async (req, res) => {
  const allMessages = await getAllMessages();

  if (allMessages.success) {
    res.status(200).json(allMessages.payload);
  } else {
    res.status(400).json({ error: `messages, all index route error. ${allMessages.payload}` });
  }
})

//index route all by chatroom_id
messages.get('/:chatroomId', async (req, res) => {
  const { chatroomId } = req.params;
  const allMessagesByRoom = await getAllMessagesByRoom(chatroomId);

  if (allMessagesByRoom.success) {
    res.status(200).json(allMessagesByRoom.payload);
  } else {
    res.status(400).json({ error: `messages, all index by chatroomId route error. ${allMessagesByRoom.payload}` });
  }
})

//create route
messages.post('/', async (req, res) => {
  const newMessage = req.body;
  const createdMessage = await createMessage(newMessage);

  if (createdMessage.success) {
    res.status(200).json(createdMessage.payload);
  } else {
    res.status(400).json({ error: `messages, create route error. ${createdMessage.payload}` });
  }
})

//delete route
messages.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedMessage = await deleteMessage(id);

  if (deletedMessage.success) {
    res.status(200).json(deletedMessage.payload);
  } else {
    res.status(400).json({ error: `messages, delete route error. ${deletedMessage.payload}` });
  }
})

//update route
messages.put('/:id', async (req, res) => {
  const { id } = req.params;
  const editMessage = req.body;
  const updatedMessage = await updateMessage(id, editMessage);

  if (updatedMessage.success) {
    res.status(200).json(updatedMessage.payload);
  } else {
    res.status(400).json({ error: `messages, update route error. ${updatedMessage.payload}` });
  }
})


module.exports = messages;