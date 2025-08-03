import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import { Leaderboard } from './Components/Leaderboard';
import { SubmitProblem } from './Submission/SubmitProblem';
import { FetchAllYourSubmissions } from './Submission/FetchAllYourSubmissions';
import { ShowSubmissionById } from './Submission/ShowSubmissionById';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route>
            <Route path="/:contestId" element={<Leaderboard />} />
            <Route path="/submissions/submit" element={<SubmitProblem />} />
            <Route path="/submissions/mine" element={<FetchAllYourSubmissions />} />
            <Route path="/submissions/:id" element={<ShowSubmissionById />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
