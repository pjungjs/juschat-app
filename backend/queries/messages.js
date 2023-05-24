const db = require('../db/dbConfig.js');

//index query
const getAllMessages = async () => {
  try {
    const allMessages = await db.any("SELECT * FROM messages;");
    return { success: true, payload: allMessages };
  } catch (error) {
    return { success: false, payload: `messages, index query error. ${error}` };
  }
}

//index query chatroom_id
const getAllMessagesByRoom = async (chatroomId) => {
  try {
    const allMessagesByRoom = await db.any("SELECT * FROM messages WHERE chatroom_id=$1;", chatroomId);
    return { success: true, payload: allMessagesByRoom };
  } catch (error) {
    return { success: false, payload: `messages, index query error. ${error}` };
  }
}

//create query
const createMessage = async (messageToAdd) => {
  const { chatroom_id, user_id, message, sent_at } = messageToAdd;

  try {
    const newMessage = await db.one(
      "INSERT INTO messages (chatroom_id, user_id, message, sent_at) VALUES ($1, $2, $3, $4) RETURNING *;",
      [chatroom_id, user_id, message, sent_at]
    );
    return { success: true, payload: newMessage };
  } catch (error) {
    return { success: false, payload: `messages, create query error. ${error}` };
  }
}

//delete query
const deleteMessage = async (id) => {
  try {
    const deletedMessage = await db.one("DELETE FROM messages WHERE id=$1 RETURNING *;", id);
    return { success: true, payload: deletedMessage };
  } catch (error) {
    return { success: false, payload: `messages, delete query error. ${error}` };
  }
}

//update query
const updateMessage = async (id, messageToUpdate) => {
  const { chatroom_id, user_id, message, sent_at } = messageToUpdate;

  try {
    const updatedMessage = await db.one(
      "UPDATE messages SET chatroom_id=$1, user_id=$2, message=$3, sent_at=$4 WHERE id=$5 RETURNING *;",
      [chatroom_id, user_id, message, sent_at, id]
    );
    return { success: true, payload: updatedMessage };
  } catch (error) {
    return { success: false, payload: `messages, update query error. ${error}` };
  }
}


module.exports = {
  getAllMessages,
  getAllMessagesByRoom,
  createMessage,
  deleteMessage,
  updateMessage
};