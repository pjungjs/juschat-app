import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import About from "./pages/About.jsx";

function App() {
  const [user, setUser] = useState("");
console.log(user)
  return (
    <div className="App">
      <Router>
        <header>
          <NavBar />
        </header>
        <main>
          <SideBar />
          <Routes>
            <Route path="/" element={<Home setUser={setUser} />} />
            <Route path="/about" element={<About />} />

            <Route path="/user/:name" />
            <Route path="/user/:name/messages" />
            <Route path="/user/:name/settings" />

            <Route path="/*" element={<Error />} />
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