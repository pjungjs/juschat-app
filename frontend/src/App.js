import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import About from "./pages/About.jsx";

import UserIndex from "./components/User/UserIndex.jsx";
import UserSettings from "./components/User/UserSettings.jsx";

function App() {
  const [user, setUser] = useState({});
  const [isActive, setIsActive] = useState("");

  return (
    <div className="App">
      <Router>
        <header>
          <NavBar user={user} isActive={isActive} setIsActive={setIsActive} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home setUser={setUser} setIsActive={setIsActive} />} />
            <Route path="/about" element={<About />} />
            <Route path="/user/chat" element={<UserIndex user={user} setUser={setUser} setIsActive={setIsActive} />} />
            <Route path="/user/settings" element={<UserSettings user={user} setUser={setUser} setIsActive={setIsActive} />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;