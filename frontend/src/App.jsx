import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Leaderboard } from "./Components/Leaderboard";
import Navbar from "./Components/Navbar";

import Home from "./Components/Home";
import About from "./Components/About";
//import Login from "./Components/Login";
//import Problems from "./Components/Problems";
//import Submissions from "./Components/Submissions";
//import Leaderboard from "./Components/Leaderboard";
import "./App.css";

const isLoggedIn = false;   // NEEDS THE LOGIC

function App() {
  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />

        <Routes>
         <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/problems" replace /> : <Home />}
        />
          <Route path="/:contestId" element={<Leaderboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          {/* 
          <Route path="/Login" element={<Login />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/submissions" element={<Submissions />} />
         */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;