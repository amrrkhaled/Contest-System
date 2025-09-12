import React, { useState, useEffect } from 'react';
import '../style/Leaderboard.css'; 
import { CONTEST_ID } from "../config/config";
import api from "../api";

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const contestId = CONTEST_ID

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const response = await api.get(`/leaderboard/${contestId}`);
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderBoard();

    const interval = setInterval(fetchLeaderBoard, 10000);
    return () => clearInterval(interval);
  }, [contestId]);

  return (
    <div className="leaderboard-container">
      {/* <div className="leaderboard-watermark-wrapper">
        <div className="leaderboard-watermark">IEEE</div>
        <div className="leaderboard-subtext">AlexSB</div>
        <br />
        <div className="leaderboard-subtext">ALEXTREME</div>
      </div> */}

      <div className="leaderboard-header">
        <h1>🏆 Leaderboard 🏆</h1>
        <p>See who's leading the challenge!</p>
      </div>

      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="table-head-cell">#</th>
              <th className="table-head-cell">Team Name</th>
              <th className="table-head-cell">Solved</th>
              <th className="table-head-cell">Time (min)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => (
              <tr
                key={team.team_id || `${team.team_name}-${index}`}
                className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
              >
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{team.team_name}</td>
                <td className="table-cell">{team.solved_count}</td>
                <td className="table-cell">{team.total_penalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
