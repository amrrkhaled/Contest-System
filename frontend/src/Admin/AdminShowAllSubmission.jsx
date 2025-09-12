import React, { useEffect, useState } from 'react';
import { CONTEST_ID } from "../config/config";
import { useNavigate } from "react-router-dom";
import '../style/adminShowAllSubmission.css';
import api from "../api";

export const AdminShowAllSubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 6; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('adminToken'); 
        if (!token) {
          console.error("No admin token found. Please log in first.");
          return;
        }

        const response = await api.get(
          `/submissions?contest_id=${CONTEST_ID}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error.response?.data || error.message);
        setError("Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Pagination logic
  const indexOfLast = currentPage * submissionsPerPage;
  const indexOfFirst = indexOfLast - submissionsPerPage;
  const currentSubmissions = submissions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(submissions.length / submissionsPerPage);

  return (
    <div className="submissions-container">
      <div className="submissions-header">
        <h1>All Submissions</h1>
        <p>Contest ID: {CONTEST_ID}</p>
      </div>

      {submissions.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#787A91' }}>
          No submissions available yet.
        </p>
      ) : (
        <>
          <div className="cards-grid">
            {currentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="submission-card"
                onClick={() => navigate(`/admin/submissions/${submission.id}`)}
              >
                <h3>#{submission.id} – {submission.problem_id}</h3>
                <p className="card-title">{submission.title}</p>
                <p
                  className={
                    submission.verdict === 'Accepted'
                      ? 'verdict-accepted'
                      : 'verdict-rejected'
                  }
                >
                  {submission.verdict}
                </p>
                <p className="card-time">
                  {new Date(submission.submitted_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
            >
              ← Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
