import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import About from "./pages/About.jsx";

import UserIndex from "./components/User/UserIndex.jsx";
import UserSetting from "./components/User/UserSetting.jsx";

function App() {
  const [user, setUser] = useState("");

  return (
    <div className="App">
      <Router>
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home setUser={setUser} />} />
            <Route path="/about" element={<About />} />

            <Route path="/user/:name" element={<UserIndex user={user} />} />
            <Route path="/user/:name/settings" element={<UserSetting user={user} />}/>

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