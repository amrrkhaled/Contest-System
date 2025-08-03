import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/SubmitProblem.css';

export const SubmitProblem = () => {
  const navigate = useNavigate();

  const [problemId, setProblemId] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [code, setCode] = useState('');
  const [verdict, setVerdict] = useState('');
  const [problems, setProblems] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/problems', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProblems(res.data);
      } catch (err) {
        console.error('Error fetching problems:', err);
        setError('Failed to fetch problems.');
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/languages');
        setLanguages(res.data);
      } catch (err) {
        console.error('Error fetching languages:', err);
        setError('Failed to fetch languages.');
      }
    };

    fetchLanguages();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setCode(content); // if you want textarea to override, add a check for empty code
    };

    const allowedExtensions = ['py', 'cpp', 'java'];
    const extension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setError('Unsupported file type. Only .py, .cpp, .java are allowed.');
      return;
    }

    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerdict('');
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/submissions',
        {
          problem_id: problemId,
          language_id: languageId,
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setVerdict(res.data.verdict);
      setSuccess(true);
    } catch (err) {
      console.error('Submission error:', err.response || err.message || err);
      setError(err.response?.data?.error || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-problem-container">
      <div className="branding-header">
        <h2>IEEE AlexSB - <span style={{ color: "#474e94ff" }}>Alextreme</span></h2>
        <p>Submit Your Solution</p>
      </div>

      <form className="submit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Problem:</label>
          <select value={problemId} onChange={(e) => setProblemId(e.target.value)} required>
            <option value="">Choose a problem</option>
            {problems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Language:</label>
          <select value={languageId} onChange={(e) => setLanguageId(e.target.value)} required>
            <option value="">Choose a language</option>
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Write Code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="10"
            placeholder="Write your code here..."
            required
          />
        </div>

        <div className="form-group file-upload">
          <label htmlFor="file">Or Upload File:</label>
          <input
            id="file"
            type="file"
            accept=".py,.cpp,.java"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {success && (
        <div className="verdict-box success">
          ✅ Submitted successfully!
          {verdict && <p>Verdict: {verdict}</p>}
          <button
            className="go-submissions-btn"
            onClick={() => navigate('/submissions/mine')}
          >
            Go to My Submissions
          </button>
        </div>
      )}

      {error && (
        <div className="verdict-box error">
          ❌ Error: {error}
        </div>
      )}
    </div>
  );
};
