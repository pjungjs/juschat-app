import axios from "axios";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
const API = process.env.REACT_APP_API_URL;

function UserChatbox({ userId, roomId, allUsers, allMessagesByRoom, setAllMessagesByRoom, selectedRoom }) {
  const [newMessage, setNewMessage] = useState("");

  const createMessage = async (messageToAdd) => {
    await axios
      .post(`${API}/messages`, messageToAdd)
      .then(() => console.log(`A new message was sent!`))
      .catch((error) => console.warn("Error: POST new message", error))
  }

  const sendMessage = (event) => {
    event.preventDefault();
    const messageToAdd = { 
      chatroom_id: roomId,
      sender_id: userId,
      content: newMessage,
      sent_at: new Date()
    };
    createMessage(messageToAdd);
    setAllMessagesByRoom([...allMessagesByRoom, messageToAdd])
    setNewMessage("");
  }

  const findUserById = (id) => {
    const foundUserId = allUsers.find((theUser) => theUser.id === id);
    if (foundUserId.first_name) {
      return foundUserId.first_name;
    } else if (foundUserId.username) {
      return foundUserId.username;
    }
  }

  return (
    <div className="flex flex-col bg-blue-50 w-2/3 p-2">
      <div className="flex-grow">
        {!selectedRoom ? (
          <div className="flex h-full flex-grow items-center justify-center">
            <div className="text-gray-400 text-2xl">No selected chat</div>
          </div>  
        ) : (
          <>
            {!allMessagesByRoom.length ? (
              <div className="flex h-full flex-grow items-center justify-center">
                <div className="text-gray-400 text-2xl">No messages</div>
              </div>
            ) : (
              <div className="relative h-full">
                <div className="overflow-y-scroll absolute inset-0">
                  {allMessagesByRoom.map((message) => (
                    <div
                      key={message.sent_at}
                      className={(message.sender_id === userId ? "text-right" : "text-left")}
                    >
                      <div
                        className={"max-w-lg text-left inline-block p-2 my-2 rounded-md text-md " + (message.sender_id === userId ? "bg-sky-500 text-white" : "bg-white text-gray-500")}
                      >
                        {findUserById(message.sender_id)}
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {selectedRoom && (
        <form className="flex gap-2 pb-2" onSubmit={(event) => sendMessage(event)}>
          <input
            type="text"
            value={newMessage}
            placeholder="Type your message here"
            className="bg-white flex-grow border p-2 rounded-md"
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button type="submit" className="bg-blue-500 p-2 text-white rounded-md">
            <AiOutlineSend className="w-6 h-6" />
          </button>
        </form>
      )}
    </div>
  )
}

export default UserChatbox;