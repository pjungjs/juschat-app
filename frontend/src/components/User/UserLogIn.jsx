import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function UserLogIn({ setUser }) {
  const [allUsers, setAllUsers] = useState({});
  const [hasAccount, setHasAccount] = useState(false);
  const [logInUser, setLogInUser] = useState({
    username: "",
    password: "",
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    title: undefined,
    is_online: true,
    created_at: new Date()
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllUsers() {
      await axios
        .get(`${API}/users`)
        .then((response) => setAllUsers(response.data))
        .catch((error) => console.error("Error: GET all", error));
    };
    getAllUsers();
  }, []);

  async function createUser() {
    await axios
      .post(`${API}/users`, logInUser)
      .then(() => console.log(`user ${logInUser.username} was created sucessfully!`))
      .catch((error) => console.warn("Error: POST", error))
  };

  const handleTextChange = (event) => {
    setLogInUser({ ...logInUser, [event.target.id]: event.target.value });
  }

  const handleOnClick = () => {
    setLogInUser({ ...logInUser, username: "", password: "" });
    setHasAccount(!hasAccount);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (hasAccount) {
      const foundUser = allUsers.find((user) => user.username === logInUser.username && user.password === logInUser.password);
      if (!foundUser) {
        return alert(`Wrong username or password. Please try again.`);
      } else {
        setUser(foundUser);
      }
    } else {
      const filteredUsers = allUsers.filter((user) => user.username === logInUser.username);
      if (filteredUsers.length) {
        return alert(`The username "${logInUser.username}" is in use. Please try again.`);
      } else {
        createUser();
        setUser(logInUser);
      }
    }
    
    navigate(`/users/${logInUser.username}`);
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
            // ^ asserts the start of the string.
            // [a-z] matches any lowercase letter. This ensures that the string starts with a lowercase letter.
            // [a-z0-9_]* matches zero or more occurrences of lowercase letters, numbers, or underscores. This allows for any combination of these characters after the first lowercase letter.
            // $ asserts the end of the string.
            onChange={handleTextChange}
            className="block w-full rounded-md p-2 mb-2 border"
            required
          />
          { hasAccount && (
            <input
              id="password"
              type="text"
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
              ? <p>Sign Up</p>
              : <p>Sign In</p>
            }
          </button>
        </form>
        <div className="text-center mt-3">
          {!hasAccount ? (
            <div>
              <p>Already have an Account?</p>
              <button onClick={handleOnClick} className="hover:underline hover:text-blue-700">
                Sign In
              </button>
            </div>
          ) : (
            <div>
              <p>Don't have an Account?</p>
              <button onClick={handleOnClick} className="hover:underline hover:text-blue-700">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserLogIn;