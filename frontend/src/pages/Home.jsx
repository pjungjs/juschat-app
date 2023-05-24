import UserLogIn from "../components/User/UserLogIn.jsx";

function Home({ setUser, setIsActive }) {

  return (
    <div>
      <UserLogIn setUser={setUser} setIsActive={setIsActive} />
    </div>
  )
}

export default Home;