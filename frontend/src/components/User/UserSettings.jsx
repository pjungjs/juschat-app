import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatUnixTimeStamp } from "../../utils/formatUnixTimeStamp.js";
import UserEdit from "./UserEdit.jsx";
const API = process.env.REACT_APP_API_URL;

function UserSettings({ user, setUser, setIsActive }) {
  const [editToggle, setEditToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsActive("settings");
  }, [])

  async function handleDelete () {
    if (window.confirm("Are you sure you want to delete this User?")) {
      await axios
        .delete(`${API}/users/${user.username}`)
        .then(() => {
          setUser({});
          navigate("/");
        })
        .catch(error => console.error("Error: DELETE", error))
    }
  }

  return (
    <div className="bg-sky-100 h-screen text-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-2xl p-9">Settings</h1>
        <div>
          {!editToggle ? (
            (!!Object.keys(user).length && (
              <div className="text-left inline-flex">
                <div className="w-full max-w-lg text-center">
                  <div className="text-left space-y-3">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>First Name:</strong> {user.first_name ? user.first_name : "none"}</p>
                    <p><strong>Last Name:</strong> {user.last_name ? user.last_name : "none"}</p>
                    <p><strong>Short Bio:</strong> {user.short_bio ? user.short_bio : "none"}</p>
                    <p><strong>Email:</strong> {user.email ? user.email : "none"}</p>
                    <p><strong>Password:</strong> {user.password ? user.password : "none"}</p>
                    <p><strong>Created at:</strong> {formatUnixTimeStamp(user.created_at)}</p>
                  </div>
                  <div className="p-7 space-x-2">
                    <button
                      onClick={() => navigate("/user/chat")}
                      className="py-2 px-4 border-b-4 font-bold text-gray-800 bg-gray-300 hover:bg-gray-400 border-gray-400 hover:border-gray-600 rounded-md"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setEditToggle(true)}
                      className="py-2 px-4 border-b-4 font-bold text-white bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete()}
                      className="py-2 px-4 border-b-4 font-bold text-white bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <UserEdit user={user} setUser={setUser} setEditToggle={setEditToggle} />
            </div>
          )}
        </div>        
      </div>
    </div>
  )
}

export default UserSettings;