import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../style/ShowSubmissionById.css';

export const ShowSubmissionById = () => {
  const [teamId, setTeamId] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [code, setCode] = useState("");
  const [problemId, setProblemId] = useState("");
  const [title, setTitle] = useState("");
  const [verdict, setVerdict] = useState("");
  const [submittedAt, setSubmittedAt] = useState("");
  const [executionTime, setExecutionTime] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/submissions/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = response.data;

        setSubmissionId(data.id);
        setTeamId(data.team_id || ""); // If included in backend response
        setProblemId(data.problem_id);
        setTitle(data.title);
        setVerdict(data.verdict);
        setSubmittedAt(data.submitted_at);
        setExecutionTime(data.execution_time_ms);
        setCode(data.code);
      } catch (error) {
        console.error('❌ Failed to fetch submission details:', error);
        if (error.response && error.response.status === 401) {
          alert('❌ Unauthorized. Please log in again.');
        } else {
          alert('❌ Could not load submission details. Try again later.');
        }
        setTeamId("");
        setSubmissionId("");
        setCode("");
      }
    };

    fetchSubmissionDetails();
  }, [id]);

  return (
    <div className="submission-view-container">
      <h2>Submission Details</h2>
      <div className="submission-details">
        <p><strong>Team ID:</strong> {teamId}</p>
        <p><strong>Submission ID:</strong> {submissionId}</p>
        <p><strong>Problem ID:</strong> {problemId}</p>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Verdict:</strong> {verdict}</p>
        <p><strong>Submitted At:</strong> {new Date(submittedAt).toLocaleString()}</p>
        <p><strong>Execution Time:</strong> {executionTime} ms</p>
      </div>

      <h3 className="code-label">Submitted Code:</h3>
      <pre className="submission-code">
        {code}print("Hello, World!")
      </pre>

      <p className="note">Note: This is a read-only view of the submission code.</p>
    </div>
  );
};
