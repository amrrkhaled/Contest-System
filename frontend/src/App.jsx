import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Leaderboard } from './Components/Leaderboard';
import { FetchAllYourSubmissions } from './Submission/FetchAllYourSubmissions';
import { ShowSubmissionById } from './Submission/ShowSubmissionById';
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import { ContestProvider } from "./context/ContestContext";

function App() {
  return (
    <ContestProvider>
      <Router>
        <Routes>
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
