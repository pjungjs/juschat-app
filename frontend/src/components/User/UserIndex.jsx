import axios from "axios";
import { useEffect, useState } from "react";
import UserChatrooms from "./UserChatrooms.jsx";
import UserChatbox from "./UserChatbox.jsx";
const API = process.env.REACT_APP_API_URL;

function UserIndex({ user, setUser }) {
  const [allUsers, setAllUsers] = useState({});
  const [allChatrooms, setAllChatrooms] = useState({});
  const [allMessagesByRoom, setAllMessagesByRoom] = useState({});
  const [onlineUsers, setOnlineUsers] = useState({});
  const [userId, setUserId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      await axios
        .get(`${API}/users`)
        .then((response) => {
          const online = response.data.filter((theUser) => theUser.is_online === true);
          if (!user.id) {
            const loggedInUser = online.find((theUser) => theUser.username === user.username);
            setUser(loggedInUser);
          }
          setOnlineUsers(online);
          setAllUsers(response.data);
        })
        .catch((error) => console.error("Error: GET all Users", error))
    }
  
    const getAllChatrooms = async () => {
      await axios
        .get(`${API}/chatrooms`)
        .then((response) => setAllChatrooms(response.data))
        .catch((error) => console.error("Error: GET all Chatrooms", error))
    }

    getAllUsers();
    getAllChatrooms();
  }, [user, setUser])

  useEffect(() => {
    if (allUsers.length && user) {
      const theUser = allUsers.find((theUser) => theUser.username === user.username);
      if (theUser) setUserId(theUser.id);
    }
    if (allChatrooms.length && user) {
      const theRoom = allChatrooms.find((theRoom) => theRoom.room_name === selectedRoom);
      if (theRoom) setRoomId(theRoom.id);
    }
  }, [user, allUsers, allChatrooms, selectedRoom])

  useEffect(() => {
    const getAllMessagesByRoom = async () => {
      if (roomId) {
        await axios
          .get(`${API}/messages/${roomId}`)
          .then((response) => {
            console.log(response.data)
            setAllMessagesByRoom(response.data)
          })
          .catch((error) => console.error("Error: GET all Chatrooms", error))
      }
    }
    getAllMessagesByRoom();
  }, [roomId])


  return (
    <div className="flex h-screen">
      <UserChatrooms
        userId={userId}
        onlineUsers={onlineUsers}
        allChatrooms={allChatrooms}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      <UserChatbox
        userId={userId}
        roomId={roomId}
        allUsers={allUsers}
        allMessagesByRoom={allMessagesByRoom}
        setAllMessagesByRoom={setAllMessagesByRoom}
        selectedRoom={selectedRoom}
      />
    </div>
  )
}

export default UserIndex;