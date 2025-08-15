import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { Leaderboard } from "./Components/Leaderboard";
import { FetchAllYourSubmissions } from "./Components/FetchAllYourSubmissions";
import { ShowSubmissionById } from "./Components/ShowSubmissionById";
import Problems from "./Components/Problems";
import ProblemDetails from "./Components/ProblemDetails";
import { ContestProvider } from "./context/ContestContext";
import Logout from "./Auth/Logout";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import { CONTEST_ID } from "./config/config";
console.log("Contest ID from env:", CONTEST_ID);

function App() {
  return (
    <ContestProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetails />} />
            <Route path={`/leaderboard/${CONTEST_ID}`} element={<Leaderboard />} />
            <Route path="/submissions/" element={<FetchAllYourSubmissions />} />
            <Route path="/submissions/:id" element={<ShowSubmissionById />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ContestProvider>
  );
}

export default App;
