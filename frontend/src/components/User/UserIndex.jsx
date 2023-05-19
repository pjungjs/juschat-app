import UserChatrooms from "./UserChatrooms.jsx";
import UserChatbox from "./UserChatbox.jsx";

function UserIndex({ user }) {
  console.log(user)
  return (
    <div>
      <h1>User Page</h1>
      <UserChatrooms />
      <UserChatbox />
    </div>
  )
}

export default UserIndex;