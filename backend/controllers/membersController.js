const express = require('express');
const members = express.Router({ mergeParams: true });
const { 
  getAllMembers,
  getAllMembersByRoom,
  createMember,
  deleteMember,
  updateMember
} = require('../queries/members.js');

//index route all
members.get('/', async (req, res) => {
  const allMembers = await getAllMembers();

  if (allMembers.success) {
    res.status(200).json(allMembers.payload);
  } else {
    res.status(400).json({ error: `members, all index route error. ${allMembers.payload}` });
  }
})

//index route all by chatroom_id
members.get('/:chatroomId', async (req, res) => {
  const { chatroomId } = req.params;
  const allMembersByRoom = await getAllMembersByRoom(chatroomId);

  if (allMembersByRoom.success) {
    res.status(200).json(allMembersByRoom.payload);
  } else {
    res.status(400).json({ error: `members, all index by chatroomId route error. ${allMembersByRoom.payload}` });
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