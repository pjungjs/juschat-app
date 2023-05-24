import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import UserNewChatroom from "./UserNewChatroom.jsx";
const API = process.env.REACT_APP_API_URL;

function UserChatrooms({ user, setUser, userId, onlineUsers, allChatrooms, setAllChatrooms, selectedRoom, setSelectedRoom }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logOutUpdateUser = async (editUser) =>  {
    await axios
      .put(`${API}/users/${user.username}`, editUser)
      .then((response) => {
        console.log(response.data);
        setUser({});
        navigate("/");
      })
      .catch((error) => console.warn("Error: PUT", error))
  }

  const handleDelete = async () => {
    await axios
      .delete(`${API}/users/${user.username}`)
      .then(() => {
        setUser({});
        navigate("/");
      })
      .catch(error => console.error("Error: DELETE", error))
  }

  const logOut = () => {
    if (!user.password) {
      alert("WARNING! If your password is not setup your account will be deleted automatically. If you wish to save your messages, please go to the Settings and update the password.");

      if (window.confirm("Would you like to delete the account?")) {
        alert("Account Deleted");
        handleDelete();
      } else {
        alert("Please update the password");
        navigate("/user/settings");
      }
    } else {
      const editUser = { ...user, is_online: false };
      logOutUpdateUser(editUser);
    }
  }

  const showUserAvatar = (onlineUser) => {
    const bgColors = [
      'bg-red-200', 'bg-amber-200',
      'bg-lime-200', 'bg-emerald-200',
      'bg-cyan-200', 'bg-indigo-200',
      'bg-pink-200', 'bg-neutral-300',
    ];
    const bgColorIndex = onlineUser.id % bgColors.length;

    return (
      <div className={"w-8 h-8 rounded-full flex items-center " + bgColors[bgColorIndex]}>
        <div className="text-center w-full">
          {onlineUser.username[0].toUpperCase()}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white w-1/3 overflow-auto">
      <div>
        <div className="flex text-cyan-600 font-bold text-xl gap-2 p-4 border-b-2 overflow-x-scroll">
          <div className="flex">
            <FaUserCircle className="h-7 w-7" />
            &nbsp;{user.username}
          </div>
          &emsp;
          <div
            className="flex ml-auto cursor-pointer text-gray-600 text-base items-center"
            onClick={() => logOut()}
          >
            Log Out
            <HiOutlineArrowCircleRight className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="border-b-2 pb-3">
        <div className="flex gap-2 p-4 text-blue-500 font-bold text-xl justify-between">
          Chatrooms
          <button onClick={() => setShowModal(!showModal)}>+ add</button>
        </div>
        <div>
          {showModal && (
            <UserNewChatroom userId={userId} onlineUsers={onlineUsers} allChatrooms={allChatrooms} setAllChatrooms={setAllChatrooms} showModal={showModal} setShowModal={setShowModal} />
          )}
        </div>
        <div>
          {allChatrooms.length && (
            allChatrooms.map((chatroom) => (
              chatroom.chatroom_name && (
                <div
                  key={chatroom.id}
                  onClick={() => setSelectedRoom(chatroom.chatroom_name)}
                  className={"border-b border-gray-100 flex items-center gap-2 cursor-pointer " + (chatroom.chatroom_name === selectedRoom ? "bg-blue-50" : "")}
                >
                  {chatroom.chatroom_name === selectedRoom && (
                    <div className="w-1 bg-blue-500 h-12"></div>
                  )}
                  <div className="flex py-2 pl-4">
                    <span className={chatroom.chatroom_name === selectedRoom ? "font-bold" : "text-gray-600"}>
                      {chatroom.chatroom_name}
                    </span>
                  </div>
                </div>
              )
            ))
          )}
        </div>
      </div>
      <div className="border-b-2 pb-3">
        <div className="flex gap-2 p-4 text-blue-500 font-bold text-xl">
          Online
        </div>
        {onlineUsers.length && (
          onlineUsers.map((onlineUser) => (
            onlineUser.username !== user.username && (
              <div
                key={onlineUser.id}
                // onClick={() => setSelectedRoom(onlineUser.username)}
                className={"border-b border-gray-100 flex items-center gap-2 cursor-pointer " + (onlineUser.username === selectedRoom ? "bg-blue-50" : "")}
              >
                {onlineUser.username === selectedRoom && (
                  <div className="w-1 bg-blue-500 h-12"></div>
                )}
                <div className="flex gap-2 py-2 pl-4 items-center">
                  {showUserAvatar(onlineUser)}
                  <span className={onlineUser.username === selectedRoom ? "font-bold" : "text-gray-600"}>
                    {
                      onlineUser.first_name && onlineUser.last_name
                      ? onlineUser.first_name + " " + onlineUser.last_name
                      : onlineUser.username
                    }
                  </span>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  )
}

export default UserChatrooms;