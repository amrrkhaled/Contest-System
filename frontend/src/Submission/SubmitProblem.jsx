import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/SubmitProblem.css';

export const SubmitProblem = () => {
  const [problemId, setProblemId] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [code, setCode] = useState('');
  const [verdict, setVerdict] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);

  // useEffect(() => {
  //   const fetchProblems = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/api/problems');
  //       setProblems(res.data);
  //     } catch (err) {
  //       console.error(' Failed to fetch problems:', err);
  //       setError(' Could not load problems. Try again later.');
  //     }
  //   };

  //   fetchProblems();
  //   document.getElementById("problemId")?.focus();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setVerdict('');

    const token = localStorage.getItem('token');

    if (!token) {
      setError('❌ You must be logged in to submit.');
      return;
    }

    if (!problemId || isNaN(parseInt(languageId))) {
      setError('❌ Select a valid problem and language.');
      return;
    }

    if (code.trim().length < 5) {
      setError('❌ Code is too short. Please write a valid solution.');
      return;
    }

    const submissionData = {
      problem_id: parseInt(problemId),
      language_id: parseInt(languageId),
      code: code.trim(),
    };

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/submissions',
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVerdict(`✅ Submission Received - ID: ${response.data.submissionId}`);
      setProblemId('');
      setLanguageId('');
      setCode('');
    } catch (err) {
      console.error('❌ Submission error:', err?.response?.data || err.message);

      if (err.response?.status === 400) {
        setError(err.response.data?.error || "❌ Bad Request.");
      } else if (err.response?.status === 401) {
        setError("❌ Unauthorized: Please log in again.");
      } else {
        setError(`❌ Submission failed: ${err?.response?.data?.error || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-problem-container">
      <div className="branding-header">
        <h2>IEEE AlexSB - <span style={{color: "#474e94ff"}}>Alextreme</span></h2>
        <p>Submit Your Solution</p>
      </div>

      <form className="submit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="problemId">Problem</label>
          <select
            id="problemId"
            value={problemId}
            onChange={(e) => setProblemId(e.target.value)}
            required
          >
            <option value="">Select a problem</option>
            {problems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title} (ID: {problem.id})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="languageId">Language</label>
          <select
            id="languageId"
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
            required
          >
            <option value="">Select Language</option>
            <option value="1">Python</option>
            <option value="2">C++</option>
            <option value="4">Java</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="code">Your Code</label>
          <textarea
            id="code"
            rows="10"
            placeholder="Write your solution here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!problemId || !languageId || !code.trim() || loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {verdict && <div className="verdict-box success">{verdict}</div>}
      {error && <div className="verdict-box error">{error}</div>}
    </div>
  );
};

