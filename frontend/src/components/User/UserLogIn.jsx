import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function UserLogIn({ setUser, setIsActive }) {
  const [allUsers, setAllUsers] = useState({});
  const [hasAccount, setHasAccount] = useState(true);
  const [logInUser, setLogInUser] = useState({
    username: "",
    password: "",
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    short_bio: undefined,
    is_online: true,
    created_at: Math.floor(Date.now() / 1000) //unix timestamp in seconds
  });
  const navigate = useNavigate();

  useEffect(() => {
    setIsActive("home");
    async function getAllUsers() {
      await axios
        .get(`${API}/users`)
        .then((response) => setAllUsers(response.data))
        .catch((error) => console.error("Error: GET all", error));
    };
    getAllUsers();
  }, [setIsActive]);

  async function createUser() {
    await axios
      .post(`${API}/users`, logInUser)
      .then(() => {
        console.log(logInUser)
        console.log(`user ${logInUser.username} was created sucessfully!`)
      })
      .catch((error) => console.warn("Error: POST", error))
  };

  async function updateUser(userName, editUser) {
    await axios
      .put(`${API}/users/${userName}`, editUser)
      .then((response) => {
        // console.log(response.data)
        console.log("now the user is online!")
      })
      .catch((error) => console.warn("Error: PUT", error))
  }

  const handleTextChange = (event) => {
    setLogInUser({ ...logInUser, [event.target.id]: event.target.value });
  }

  const handleOnClick = () => {
    setLogInUser({ ...logInUser, password: "" });
    setHasAccount(!hasAccount);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (hasAccount) {
      const foundUser = allUsers.find((user) => user.username === logInUser.username && user.password === logInUser.password);
      const theUserIsOnline = allUsers.find((user) => user.username === logInUser.username && user.is_online === true);
      if (!foundUser) {
        return alert(`Wrong username or password. Please try again.`);
      } else if (theUserIsOnline) {
        return alert(`The user "${logInUser.username}" is in use. Please try again.`);
      } else {
        const editUser = { ...foundUser, is_online: true };
        updateUser(foundUser.username, editUser);
        setUser(foundUser);
      }
    } else {
      const filteredUsers = allUsers.filter((user) => user.username === logInUser.username );
      if (filteredUsers.length) {
        return alert(`The username "${logInUser.username}" is taken. Please try again.`);
      } else {
        createUser();
        setUser(logInUser);
      }
    }
    navigate("/user/chat");
    setIsActive("chat")
    setLogInUser({ ...logInUser, username: "", password: "" });
  }

  return (
    <div className="bg-cyan-100 h-screen flex items-center">
      <div className="w-64 mx-auto mb-12">
        <form onSubmit={handleSubmit}>
          <input
            id="username"
            type="text"
            value={logInUser.username}
            placeholder="username"
            pattern="^[a-z][a-z0-9_]*$"
            onChange={handleTextChange}
            className="block w-full rounded-md p-2 mb-2 border"
            required
          />
          {hasAccount && (
            <input
              id="password"
              type="password"
              value={logInUser.password}
              placeholder="password"
              onChange={handleTextChange}
              className="block w-full rounded-md p-2 mb-2 border"
              required
            />
          )}
          <button type="submit" className="bg-blue-400 text-white block w-full rounded-md p-2 hover:bg-blue-500">
            {
              !hasAccount
              ? <p>JusChat</p>
              : <p>Sign In</p>
            }
          </button>
        </form>
        <div className="text-center mt-3">
          {!hasAccount ? (
            <div>
              <p>Already have an Account?</p>
              <button onClick={handleOnClick} className="text-blue-700 hover:underline">
                Sign In
              </button>
            </div>
          ) : (
            <div>
              <p>Don't have an Account?</p>
              <button onClick={handleOnClick} className="text-blue-700 hover:underline">
                JusChat!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserLogIn;