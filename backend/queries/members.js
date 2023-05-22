const db = require('../db/dbConfig.js');

//index query all
const getAllMembers = async () => {
  try {
    const allMembers = await db.any("SELECT * FROM members");
    return { success: true, payload: allMembers };
  } catch (error) {
    return { success: false, payload: `members, index query error. ${error}` };
  }
}

//index query by chatroom_id
const getAllMembersByRoom = async (chatroomId) => {
  try {
    const allMembersByRoom = await db.any("SELECT * FROM members WHERE chatroom_id=$1", chatroomId);
    return { success: true, payload: allMembersByRoom };
  } catch (error) {
    return { success: false, payload: `members, index query error. ${error}` };
  }
}

//create query
const createMember = async (memberToAdd) => {
  const { chatroom_id, user_id } = memberToAdd;

  try {
    const newMember = await db.one(
      "INSERT INTO members (chatroom_id, user_id) VALUES ($1, $2) RETURNING *;",
      [chatroom_id, user_id]
    );
    return { success: true, payload: newMember };
  } catch (error) {
    return { success: false, payload: `members, create query error. ${error}` };
  }
}

//delete query
const deleteMember = async (id) => {
  try {
    const deletedMember = await db.one("DELETE FROM members WHERE id=$1 RETURNING *;", id);
    return { success: true, payload: deletedMember };
  } catch (error) {
    return { success: false, payload: `members, delete query error. ${error}` };
  }
}

//update query
const updateMember = async (id, memberToUpdate) => {
  const { chatroom_id, user_id } = memberToUpdate;

  try {
    const updatedMember = await db.one(
      "UPDATE members SET chatroom_id=$1, user_id=$2 WHERE id=$3 RETURNING *;",
      [chatroom_id, user_id, id]
    );
    return { success: true, payload: updatedMember };
  } catch (error) {
    return { success: false, payload: `members, update query error. ${error}` };
  }
}


module.exports = {
  getAllMembers,
  getAllMembersByRoom,
  createMember,
  deleteMember,
  updateMember
};