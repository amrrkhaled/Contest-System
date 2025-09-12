import React, { useState } from 'react';
import '../style/AddContest.css';
import api from "../api";

export const AddContest = () => {
  const [name, setName] = useState('');
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [is_active, setIsActive] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [contestId, setContestId] = useState(null); // 👈 new state to hold ID

  const handleAddContest = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setContestId(null);

    try {
      const response = await api.post(
        '/contests/',
        { name, start_time, end_time, is_active },
      );

      if (response.status === 201) {
        const createdContest = response.data; // 👈 backend should return contest object
        setSuccess('Contest created successfully ✅');
        setContestId(createdContest.id); // 👈 save contest id
        setName('');
        setStartTime('');
        setEndTime('');
        setIsActive(false);
      } else {
        setError('Failed to create contest');
      }
    } catch (error) {
      console.error('Error creating contest:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to create contest');
      }
    }
  };

  return (
    <div className="add-contest-container">
      <div className="add-contest-card">
        <h2>Add Contest</h2>
        <form onSubmit={handleAddContest}>
          <div className="input-group">
            <label htmlFor="name">Contest Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="start_time">Start Time</label>
            <input
              type="datetime-local"
              id="start_time"
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="end_time">End Time</label>
            <input
              type="datetime-local"
              id="end_time"
              value={end_time}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="input-group checkbox-group">
            <label htmlFor="is_active">Is Active</label>
            <input
              type="checkbox"
              id="is_active"
              checked={is_active}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          {contestId && <p className="contest-id">Contest ID: {contestId}</p>} {/* 👈 show contest ID */}

          <button type="submit">Add Contest</button>
        </form>
      </div>
    </div>
  );
};
