import { Link } from "react-router-dom";

function NavBar({ user, isActive, setIsActive }) {
  const activePage = "text-teal-500 border-b-4 border-teal-300";
  const notActivePage = "text-gray-500 hover:text-teal-300 transition duration-300";

  return (
    <nav>
      <div className="flex md:flex md:flex-grow space-x-1">
        <Link
          to="/"
          onClick={() => setIsActive("home")}
          className={"py-4 px-2 mx-0 font-semibold " + (isActive === "home" ? activePage : notActivePage)}
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => setIsActive("about")}
          className={"py-4 px-2 mx-0 font-semibold " + (isActive === "about" ? activePage : notActivePage)}
        >
          About
        </Link>
        {user && !!Object.keys(user).length && (
          <>
            <Link
              to="/user/chat"
              onClick={() => setIsActive("chat")}
              className={"py-4 px-2 mx-0 font-semibold " + (isActive === "chat" ? activePage : notActivePage)}
            >
              Chat
            </Link>
            <Link
              to="/user/settings"
              onClick={() => setIsActive("settings")}
              className={"py-4 px-2 mx-0 font-semibold " + (isActive === "settings" ? activePage : notActivePage)}
            >
              User's Settings
            </Link>
          </>
        )}
      </div>
    </nav>
  )

}

export default NavBar;