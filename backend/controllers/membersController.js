const express = require('express');
const members = express.Router({ mergeParams: true });
const { 
  getAllMembers,
  getOneMember,
  createMember,
  deleteMember,
  updateMember
} = require('../queries/members.js');

//index route
members.get('/', async (req, res) => {
  const { chatroomId } = req.params;
  const allMembers = await getAllMembers(chatroomId);

  if (allMembers.success) {
    res.status(200).json(allMembers.payload);
  } else {
    res.status(400).json({ error: `members, index route error. ${allMembers.payload}` });
  }
})

//show route
members.get('/:id', async (req, res) => {
  const { id } = req.params;
  const oneMember = await getOneMember(id);

  if (oneMember.success) {
    res.status(200).json(oneMember.payload);
  } else {
    res.status(400).json({ error: `members, show route error. ${oneMember.payload}` });
  }
})

//create route
members.post('/', async (req, res) => {
  const newMember = req.body;
  const createdMember = await createMember(newMember);

  if (createdMember.success) {
    res.status(200).json(createdMember.payload);
  } else {
    res.status(400).json({ error: `members, create route error. ${createdMember.payload}` });
  }
})

//delete route
members.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedMember = await deleteMember(id);

  if (deletedMember.success) {
    res.status(200).json(deletedMember.payload);
  } else {
    res.status(400).json({ error: `members, delete route error. ${deletedMember.payload}` });
  }
})

//update route
members.put('/:id', async (req, res) => {
  const { id } = req.params;
  const editMember = req.body;
  const updatedMember = await updateMember(id, editMember);

  if (updatedMember.success) {
    res.status(200).json(updatedMember.payload);
  } else {
    res.status(400).json({ error: `members, update route error. ${updatedMember.payload}` });
  }
})


module.exports = members;