const db = require('../db/dbConfig.js');

//index query
const getAllChatrooms = async () => {
  try {
    const allChatrooms = await db.any("SELECT * FROM chatrooms");
    return { success: true, payload: allChatrooms };
  } catch (error) {
    return { success: false, payload: `chatrooms, index query error. ${error}` };
  }
}

//show query by id
const getOneChatroom = async (id) => {
  try {
    const oneChatroom = await db.one("SELECT * FROM chatrooms WHERE id=$1;", id);
    return { success: true, payload: oneChatroom };
  } catch (error) {
    return { success: false, payload: `chatrooms, show query error. ${error}` };
  }
}

//create query
const createChatroom = async (chatroomToAdd) => {
  const { chatroom_name, created_at, created_by, managed_by, open_to_public, description } = chatroomToAdd;

  try {
    const newChatroom = await db.one(
      "INSERT INTO chatrooms (chatroom_name, created_at, created_by, managed_by, open_to_public, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [chatroom_name, created_at, created_by, managed_by, open_to_public, description]
    );
    return { success: true, payload: newChatroom };
  } catch (error) {
    return { success: false, payload: `chatrooms, create query error. ${error}` };
  }
}

//delete query
const deleteChatroom = async (id) => {
  try {
    const deletedChatroom = await db.one("DELETE FROM chatrooms WHERE id=$1 RETURNING *;", id);
    return { success: true, payload: deletedChatroom };
  } catch (error) {
    return { success: false, payload: `chatrooms, delete query error. ${error}` };
  }
}

//update query
const updateChatroom = async (id, chatroomToUpdate) => {
  const { chatroom_name, created_at, created_by, managed_by, open_to_public, description } = chatroomToUpdate;

  try {
    const updatedChatroom = await db.one(
      "UPDATE chatrooms SET chatroom_name=$1, created_at=$2, created_by=$3, managed_by=$4, open_to_public=$5, description=$6 WHERE id=$7 RETURNING *;",
      [chatroom_name, created_at, created_by, managed_by, open_to_public, description, id]
    );
    return { success: true, payload: updatedChatroom };
  } catch (error) {
    return { success: false, payload: `chatrooms, update query error. ${error}` };
  }
}


module.exports = {
  getAllChatrooms,
  getOneChatroom,
  createChatroom,
  deleteChatroom,
  updateChatroom
};