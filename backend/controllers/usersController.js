const express = require('express');
const users = express.Router();
const { 
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser
} = require('../queries/users.js');

//index route
users.get('/', async (req, res) => {
  const allUsers = await getAllUsers();

  if (allUsers.success) {
    res.status(200).json(allUsers.payload);
  } else {
    res.status(400).json({ error: `users, index route error. ${allUsers.payload}` });
  }
})

//show route
users.get('/:id', async (req, res) => {
  const { id } = req.params;
  const oneUser = await getOneUser(id);

  if (oneUser.success) {
    res.status(200).json(oneUser.payload);
  } else {
    res.status(400).json({ error: `users, show route error. ${oneUser.payload}` });
  }
})

//create route
users.post('/', async (req, res) => {
  const newUser = req.body;
  const createdUser = await createUser(newUser);

  if (createdUser.success) {
    res.status(200).json(createdUser.payload);
  } else {
    res.status(400).json({ error: `users, create route error. ${createdUser.payload}` });
  }
})

//delete route
users.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);

  if (deletedUser.success) {
    res.status(200).json(deletedUser.payload);
  } else {
    res.status(400).json({ error: `users, delete route error. ${deletedUser.payload}` });
  }
})

//update route
users.put('/:id', async (req, res) => {
  const { id } = req.params;
  const editUser = req.body;
  const updatedUser = await updateUser(id, editUser);

  if (updatedUser.success) {
    res.status(200).json(updatedUser.payload);
  } else {
    res.status(400).json({ error: `users, update route error. ${updatedUser.payload}` });
  }
})


module.exports = users;