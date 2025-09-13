import React, { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/contrib/auto-render';
import api from "../api";

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
      const response = await api.post(
        `/problems/admin/${contestId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
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

  useEffect(() => {
      problems.forEach((problem) => {
        const el = document.getElementById(`uploaded-problem-${problem.id}`);
        if (el) {
          renderMathInElement(el, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
            ],
          });
        }
      });
    }, [problems]);

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
                  <div id={`uploaded-problem-${problem.id}`} className="problem-description">
                    <div style={{ whiteSpace: "pre-wrap" }}>{problem.description}</div>
                    <h6>Input</h6>
                    <div style={{ whiteSpace: "pre-wrap" }}>{problem.input_description}</div>
                    <h6>Output</h6>
                    <div style={{ whiteSpace: "pre-wrap" }}>{problem.output_description}</div>
                  </div>
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
