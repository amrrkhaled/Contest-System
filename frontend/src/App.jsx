import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Leaderboard } from "./Components/Leaderboard";
import Home from "./Components/Home";
import About from "./Components/About";
//import Login from './Components/Login';
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:contestId" element={<Leaderboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          {/* <Route path="/Login" element={<Login />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
