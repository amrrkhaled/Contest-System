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

const isLoggedIn = false;; // TODO: Replace with real auth logic

function App() {
  return (
    <ContestProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/problems" replace /> : <Home />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemDetails />} />
          <Route path="/:contestId" element={<Leaderboard />} />
          <Route path="/submissions/mine" element={<FetchAllYourSubmissions />} />
          <Route path="/submissions/:id" element={<ShowSubmissionById />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ContestProvider>
  );
}

export default App;
