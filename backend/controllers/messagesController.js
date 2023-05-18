const express = require('express');
const messages = express.Router();
const { 
  getAllMessages,
  getOneMessage,
  createMessage,
  deleteMessage,
  updateMessage
} = require('../queries/messages.js');

//index route
messages.get('/', async (req, res) => {
  const allMessages = await getAllMessages();

  if (allMessages.success) {
    res.status(200).json(allMessages.payload);
  } else {
    res.status(400).json({ error: `messages, index route error. ${allMessages.payload}` });
  }
})

//show route
messages.get('/:id', async (req, res) => {
  const { id } = req.params;
  const oneMessage = await getOneMessage(id);

  if (oneMessage.success) {
    res.status(200).json(oneMessage.payload);
  } else {
    res.status(400).json({ error: `messages, show route error. ${oneMessage.payload}` });
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