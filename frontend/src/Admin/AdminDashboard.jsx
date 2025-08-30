import React from "react";
import { AddContest } from "./AddContest";
import { DropProblemsFile } from "./DropProblemsFile";
import { AdminLeaderboard } from "./AdminLeaderboard";
import { GenerateTeams } from "./GenerateTeams";
import "../style/AdminDashboard.css";

export const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p>Manage contests, upload problems, and track leaderboards.</p>
      </div>

      {/* Grid Layout */}
      <div className="admin-grid">
        {/* Left column */}
        <div className="admin-section">
          <h2 className="section-title">➕ Create Contest</h2>
          <AddContest />
        </div>

        <div className="admin-section">
          <h2 className="section-title">📂 Upload Problems</h2>
          <DropProblemsFile />
        </div>
      </div>

      {/* Full-width leaderboard */}
      <div className="admin-section leaderboard-section">
        <h2 className="section-title">🏆 Contest Leaderboard</h2>
        <AdminLeaderboard />
      </div>
      
    {/* Right column */}
    <div className="admin-section">
      <h2 className="section-title">🔄 Generate Teams</h2>
      <GenerateTeams />
    </div>
  </div>
  );
};
