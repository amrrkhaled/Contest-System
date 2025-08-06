import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContestContext } from "../context/ContextCreation";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Problems = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const { timeLeft } = useContext(ContestContext);
  const problemsPerPage = 6;
  const [solvedProblems, setSolvedProblems] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/api/problems', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProblems(res.data))
    .catch(err => {
      console.error("API error:", err);
      if (err.response?.status === 401) navigate('/login');
    });

    axios.get('http://localhost:5000/api/submissions/solved-count', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setSolvedProblems(res.data.solvedCount))
    .catch(err => console.error("Solved count API error:", err));

  }, [navigate]);

  const handleChange = (event, value) => setPage(value);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const displayedProblems = problems.slice((page - 1) * problemsPerPage, page * problemsPerPage);

  return (
    <div style={{ backgroundColor: "#EEEEEE", minHeight: "83vh", padding: "2rem", display: "flex", flexDirection:"column" ,alignItems: "center", gap: "2rem" }}>
      <Typography variant="h4" gutterBottom style={{ color: "#0F044C", fontWeight: "bold"}}>Problems</Typography>
      <div style={{ display: "flex", justifyContent:"start" , alignItems: "center", gap: "5rem", marginBottom: "1rem" }}>
        {/* Main table */}
        <div style={{ flex: 3, width: "80vw" }}>
        <TableContainer component={Paper} style={{ borderRadius: "10px", boxShadow: "0 6px 20px rgba(120,122,145,0.3)" }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#141E61" }}>
                <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", width: "10vw"}}>ID</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", width: "40vw" }}>Title</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", width: "10vw" }}>Contest ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedProblems.map((p) => (
                <TableRow
                  key={p.id}
                  component={RouterLink}
                  to={`/problems/${p.id}`}
                  sx={{ backgroundColor: "white", cursor: "pointer", textDecoration: "none", "&:hover": { backgroundColor: "#e6f0ff" } }}
                >
                  <TableCell style={{ textAlign: "center", color: "#0F044C", borderBottom: "1px solid #787A91" }} >{p.id}</TableCell>
                  <TableCell style={{ textAlign: "center", color: "#0F044C", borderBottom: "1px solid #787A91" }} >{p.title}</TableCell>
                  <TableCell style={{ textAlign: "center", color: "#0F044C", borderBottom: "1px solid #787A91" }} >{p.contest_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {problems.length > problemsPerPage && (
          <Box style={{flex: 3}} display="flex" justifyContent="center" marginTop={2}>
            <Pagination count={Math.ceil(problems.length / problemsPerPage)} page={page} onChange={handleChange} color="primary" />
          </Box>
        )}
      </div>

      {/* Contest info table */}
      <div style={{ flex: 1 }}>
        <Paper style={{ padding: "1rem", backgroundColor: "#FFFFFF", borderRadius: "10px" }}>
          <Typography variant="h6" style={{ color: "#0F044C", marginBottom: "1rem" }}>Contest Info</Typography>
          <Typography variant="body1" style={{ color: "#141E61" }}>Time Remaining:</Typography>
          <Typography variant="h5" style={{ color: "#FF0000", fontWeight: "bold" }}>{formatTime(timeLeft)}</Typography>
          <Typography variant="body1" style={{ marginTop: "1.5rem", color: "#141E61" }}>Solved Problems:</Typography>
          <Typography variant="h5" style={{ color: "#00A300", fontWeight: "bold" }}>{solvedProblems} / {problems.length}</Typography>
        </Paper>
      </div>
      </div>
      
    </div>
  );
};

export default Problems;
