import React, { useState } from "react";
import axios from "axios";
import { CONTEST_ID } from "../config/config";
import "../style/DropProblemsFile.css";

export const DropProblemsFile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [problems, setProblems] = useState([]);

    const contestId = CONTEST_ID
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/problems/admin/${contestId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setSuccess(
          `Problems uploaded successfully! ${response.data.message || ""}`
        );
        setProblems(response.data.problems || response.data);
      } else {
        setError("Failed to upload problems. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading problems:", error);
      if (error.response?.data?.message) {
        setError(`Upload failed: ${error.response.data.message}`);
      } else {
        setError("Upload failed due to a server error.");
      }
    }
  };

  return (
    <div className="drop-container">
      <div className="drop-card">
        <h1 className="drop-title">Upload Problems</h1>

        <form onSubmit={handleSubmit} className="drop-form">
          <label htmlFor="file" className="drop-label">
            Select Problems File (.json)
          </label>
          <input
            type="file"
            className="drop-input"
            id="file"
            onChange={handleFileChange}
            accept=".json"
            required
          />
          <button type="submit" className="drop-button">
            Upload
          </button>
        </form>

        {error && <div className="drop-alert error">{error}</div>}
        {success && <div className="drop-alert success">{success}</div>}

        {problems.length > 0 && (
          <div className="problems-list">
            <h2>Uploaded Problems</h2>
            <ul>
              {problems.map((problem) => (
                <li key={problem.id} className="problem-card">
                  <h5>{problem.title}</h5>
                  <p>{problem.description}</p>
                  <small>Time Limit: {problem.time_limit_ms} ms</small>
                  <br />
                  <small>Memory Limit: {problem.memory_limit_mb} MB</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
