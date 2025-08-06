import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { Leaderboard } from "./Components/Leaderboard";
import { FetchAllYourSubmissions } from "./Submission/FetchAllYourSubmissions";
import { ShowSubmissionById } from "./Submission/ShowSubmissionById";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import { ContestProvider } from "./context/ContestContext";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <ContestProvider>
      <AuthProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetails />} />
            <Route path="/:contestId" element={<Leaderboard />} />
            <Route path="/submissions" element={<FetchAllYourSubmissions />} />
            <Route path="/submissions/:id" element={<ShowSubmissionById />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
      </AuthProvider>
    </ContestProvider>
  );
}

export default App;
