import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function UserEdit({ user, setUser, setEditToggle }) {
  const [editUser, setEditUser] = useState({
    username: user.username,
    password: user.password || "",
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    short_bio: user.short_bio || "",
    is_online: user.is_online,
    created_at: user.created_at
  });
  const navigate = useNavigate();

  const updateUser = async () =>  {
    await axios
      .put(`${API}/users/${user.username}`, editUser)
      .then((response) => navigate("/user/chat"))
      .catch((error) => console.warn("Error: PUT", error))
  }

  const handleTextChange = (event) => {
    setEditUser({ ...editUser, [event.target.id]: event.target.value });
  };
  
  const handleSubmit = () => {
    setUser(editUser);
    updateUser();
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex-grow">
        <div className="pl-9 text-left inline-flex">
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  htmlFor="username"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(event) => handleTextChange(event)}
                  className="shadow appearance-none bg-gray-200 border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-red-500 text-xs italic">Username cannot be modified</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  htmlFor="short_bio"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Short Bio
                </label>
                <input
                  id="short_bio"
                  type="text"
                  value={editUser.short_bio}
                  onChange={(event) => handleTextChange(event)}
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  htmlFor="first_name"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  value={editUser.first_name}
                  onChange={(event) => handleTextChange(event)}
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="last_name"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  value={editUser.last_name}
                  onChange={(event) => handleTextChange(event)}
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  htmlFor="email"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={editUser.email}
                  onChange={(event) => handleTextChange(event)}
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  htmlFor="password"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="text"
                  value={editUser.password}
                  onChange={(event) => handleTextChange(event)}
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="p-2 space-x-2">
          <button
            onClick={() => setEditToggle(false)}
            className="py-2 px-4 border-b-4 font-bold text-gray-800 bg-gray-300 hover:bg-gray-400 border-gray-400 hover:border-gray-600 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit()}
            className="py-2 px-4 border-b-4 font-bold text-white bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserEdit;