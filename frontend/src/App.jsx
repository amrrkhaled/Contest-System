import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Leaderboard } from './Components/Leaderboard';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/:contestId" element={<Leaderboard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
