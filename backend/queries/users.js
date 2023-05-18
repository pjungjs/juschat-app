const db = require('../db/dbConfig.js');

//index query
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return { success: true, payload: allUsers };
  } catch (error) {
    return { success: false, payload: `users, index query error. ${error}` };
  }
}

//show query
const getOneUser = async (name) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE username=$1;", name);
    return { success: true, payload: oneUser };
  } catch (error) {
    return { success: false, payload: `users, show query error. ${error}` };
  }
}

//create query
const createUser = async (userToAdd) => {
  const { username, password, first_name, last_name, email, title, is_online, created_at } = userToAdd;

  try {
    const newUser = await db.one(
      "INSERT INTO users (username, password, first_name, last_name, email, title, is_online, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
      [username, password, first_name, last_name, email, title, is_online, created_at]
    );
    return { success: true, payload: newUser };
  } catch (error) {
    return { success: false, payload: `users, create query error. ${error}` };
  }
}

//delete query
const deleteUser = async (name) => {
  try {
    const deletedUser = await db.one("DELETE FROM users WHERE username=$1 RETURNING *;", name);
    return { success: true, payload: deletedUser };
  } catch (error) {
    return { success: false, payload: `users, delete query error. ${error}` };
  }
}

//update query
const updateUser = async (name, userToUpdate) => {
  const { username, password, first_name, last_name, email, title, is_online, created_at } = userToUpdate;

  try {
    const updatedUser = await db.one(
      "UPDATE users SET username=$1, password=$2, first_name=$3, last_name=$4, email=$5, title=$6, is_online=$7, created_at=$8 WHERE username=$9 RETURNING *;",
      [username, password, first_name, last_name, email, title, is_online, created_at, name]
    );
    return { success: true, payload: updatedUser };
  } catch (error) {
    return { success: false, payload: `users, update query error. ${error}` };
  }
}


module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser
};