import UserLogIn from "../components/User/UserLogIn.jsx";

function Home({ setUser }) {
  return (
    <div>
      <h1>Home Page</h1>
      <UserLogIn setUser={setUser} />
    </div>
  )
}

export default Home;