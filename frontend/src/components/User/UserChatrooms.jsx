import axios from "axios";
import { useState } from "react";
const API = process.env.REACT_APP_API_URL;

function UserChatrooms({ userId, onlineUsers, allChatrooms, selectedRoom, setSelectedRoom }) {
  const [newChatroom, setNewChatroom] = useState({
    room_name: "",
    created_at: "",
    created_by: "",
    managed_by: "",
    open_to_public: "",
    description: ""
  });

  const createChatroom = async (chatroomToAdd) => {
    await axios
      .post(`${API}/chatrooms`, chatroomToAdd)
      .then(() => console.log(`A new chatroom was added!`))
      .catch((error) => console.warn("Error: POST new message", error))
  }

  const addChatroom = () => {
    // show modal to fill a new chatroom information.
    const chatroomToAdd = {
      room_name: "",
      created_at: new Date(),
      created_by: userId,
      managed_by: userId,
      open_to_public: "",
      description: ""
    };
    createChatroom(chatroomToAdd);
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
        <div className="flex gap-2 p-4 text-blue-500 font-bold text-xl justify-between">
          Chatrooms
          <button onClick={() => addChatroom()}>+ add</button>
        </div>
        <div>
          {allChatrooms.length && (
            allChatrooms.map((chatroom) => (
              <div
                key={chatroom.id}
                onClick={() => setSelectedRoom(chatroom.room_name)}
                className={"border-b border-gray-100 flex items-center gap-2 cursor-pointer " + (chatroom.room_name === selectedRoom ? "bg-blue-50" : "")}
              >
                {chatroom.room_name === selectedRoom && (
                  <div className="w-1 bg-blue-500 h-12"></div>
                )}
                <div className="flex py-2 pl-4">
                  <span className={chatroom.room_name === selectedRoom ? "font-bold" : "text-gray-600"}>
                    {chatroom.room_name}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <div className="text-blue-500 font-bold text-xl flex gap-2 p-4 pt-9">
          Online
        </div>
        {onlineUsers.length && (
          onlineUsers.map((onlineUser) => (
            <div
              key={onlineUser.id}
              onClick={() => setSelectedRoom(onlineUser.username)}
              className={"border-b border-gray-100 flex items-center gap-2 cursor-pointer " + (onlineUser.username === selectedRoom ? "bg-blue-50" : "")}
            >
              {onlineUser.username === selectedRoom && (
                <div className="w-1 bg-blue-500 h-12"></div>
              )}
              <div className="flex gap-2 py-2 pl-4 items-center">
                {showUserAvatar(onlineUser)}
                <span className={onlineUser.username === selectedRoom ? "font-bold" : "text-gray-600"}>
                  {
                    onlineUser.first_name
                    ? onlineUser.first_name + " " + onlineUser.last_name
                    : onlineUser.username
                  }
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserChatrooms;