import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Leaderboard } from './Components/Leaderboard';
import { Login } from './Auth/Login';
import {Register} from './Auth/Register';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/:contestId" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
