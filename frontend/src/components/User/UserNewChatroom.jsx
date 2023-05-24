import axios from "axios";
import { useState } from "react";
import Select from 'react-select';
const API = process.env.REACT_APP_API_URL;

function UserNewChatroom({ userId, onlineUsers, allChatrooms, setAllChatrooms, showModal, setShowModal }) {
  const [newChatroom, setNewChatroom] = useState({
    chatroom_name: "",
    created_at: "",
    created_by: "",
    managed_by: "",
    open_to_public: "",
    description: ""
  });
  const [dropdownSelected, setDropdownSelected] = useState({});
console.log(allChatrooms)
  const options = onlineUsers.map((users) => {
    return { 
      value: users.id,
      label: users.first_name && users.last_name
        ? (users.first_name + " " + users.last_name)
        : users.first_name
          ? users.first_name
          : users.username
     }
  })

  const handleTextChange = (event) => {
    setNewChatroom({ ...newChatroom, [event.target.id]: event.target.value });
  };

  const handleDropdownChange = (event) => {
    setDropdownSelected(event);
  }

  const createMembers = async (chatroomId, idOfUser) => {
    const addMembers = {
      chatroom_id: chatroomId,
      user_id: idOfUser
    };

    await axios
      .post(`${API}/members`, addMembers)
      .then((response) => {
        console.log(response.data);
        console.log(`A new member ${idOfUser} was added to the chatroom ${chatroomId}!`);
      })
      .catch((error) => console.warn("Error: POST new message", error))
  } 

  const createChatroom = async (chatUserId, chatroomToAdd) => {
    await axios
      .post(`${API}/chatrooms`, chatroomToAdd)
      .then((response) => {
        //after creating the chatroom, add member to the chatroom.
        console.log(response.data)
        //first add the id of the user that created the chatroom.
        createMembers(response.data.id, chatUserId);
        dropdownSelected.forEach((selected) => {
          //then, add the id of the people that was added to the chatroom.
          //response.data.id : id of the chatroom
          createMembers(response.data.id, selected.value);
        })
        setAllChatrooms([...allChatrooms, response.data]);
        console.log(`A new chatroom was added!`);
        setShowModal(!showModal);
      })
      .catch((error) => console.warn("Error: POST new message", error))
  }

  const addChatroom = (event) => {
    event.preventDefault();
    const chatroomToAdd = {
      chatroom_name: newChatroom.chatroom_name,
      created_at: Math.floor(Date.now() / 1000),
      created_by: userId,
      managed_by: userId,
      open_to_public: false,
      description: newChatroom.description
    };
    
    createChatroom(userId, chatroomToAdd);
  }


  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black backdrop-blur-sm bg-opacity-30">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold">
              Create a new Chatroom
            </h3>
          </div>
          <div className="relative p-6 flex-auto">
            <form className="w-full max-w-lg" onSubmit={(event) => addChatroom(event)}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    htmlFor="chatroom_name"
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Chatroom Name
                  </label>
                  <input
                    id="chatroom_name"
                    type="text"
                    value={newChatroom.chatroom_name}
                    onChange={(event) => handleTextChange(event)}
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    htmlFor="description"
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newChatroom.description}
                    onChange={(event) => handleTextChange(event)}
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                  />
                </div>
              </div>
              <div>
                <Select
                  options={options}
                  onChange={(event) => handleDropdownChange(event)}
                  isMulti
                />
              </div>
              <div className="flex items-center justify-center space-x-6 p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-red-100 text-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-200 outline-none focus:outline-none mr-1 mb-1"
                  onClick={() => setShowModal(!showModal)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-100 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-blue-200 outline-none focus:outline-none mr-1 mb-1"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNewChatroom;