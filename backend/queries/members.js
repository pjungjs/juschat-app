const db = require('../db/dbConfig.js');

//index query
const getAllMembers = async (chatroomId) => {
  try {
    const allMembers = await db.any("SELECT * FROM members WHERE room_id=$1", chatroomId);
    return { success: true, payload: allMembers };
  } catch (error) {
    return { success: false, payload: `members, index query error. ${error}` };
  }
}

//show query
const getOneMember = async (id) => {
  try {
    const oneMember = await db.one("SELECT * FROM members WHERE id=$1;", id);
    return { success: true, payload: oneMember };
  } catch (error) {
    return { success: false, payload: `members, show query error. ${error}` };
  }
}

//create query
const createMember = async (memberToAdd) => {
  const { room_id, member_id } = memberToAdd;

  try {
    const newMember = await db.one(
      "INSERT INTO members (room_id, member_id) VALUES ($1, $2) RETURNING *;",
      [room_id, member_id]
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
  const { room_id, member_id } = memberToUpdate;

  try {
    const updatedMember = await db.one(
      "UPDATE members SET room_id=$1, member_id=$2 WHERE id=$3 RETURNING *;",
      [room_id, member_id, id]
    );
    return { success: true, payload: updatedMember };
  } catch (error) {
    return { success: false, payload: `members, update query error. ${error}` };
  }
}


module.exports = {
  getAllMembers,
  getOneMember,
  createMember,
  deleteMember,
  updateMember
};