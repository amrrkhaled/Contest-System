import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ContestContext } from "../context/ContextCreation";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Problems = () => {
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const { timeLeft } = useContext(ContestContext); // Keep countdown from context
  const problemsPerPage = 6;
  const solvedProblems = 3; // Dummy solved count

useEffect(() => {
  axios.get('http://localhost:5000/api/problems')
    .then(res => {
      console.log("Fetched problems:", res.data)
      setProblems(res.data)
    })
    .catch(err => console.error("API error:", err))
}, [])

  
  const handleChange = (event, value) => setPage(value);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const displayedProblems = problems.slice((page - 1) * problemsPerPage, page * problemsPerPage);

  return (
    <div style={{ backgroundColor: "#EEEEEE", minHeight: "89vh", padding: "2rem", display: "flex", alignItems: "center", gap: "2rem" }}>
      {/* Main table */}
      <div style={{ flex: 3 }}>
        <Typography variant="h4" gutterBottom style={{ color: "#0F044C", fontWeight: "bold" }}>Problems</Typography>
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#141E61" }}>
                <TableCell style={{ color: "#EEEEEE", width: "10vw"}}>ID</TableCell>
                <TableCell style={{ color: "#EEEEEE", width: "40vw" }}>Title</TableCell>
                <TableCell style={{ color: "#EEEEEE", width: "10vw" }}>Contest ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedProblems.map((p) => (
                <TableRow
                  key={p.id}
                  component={RouterLink}
                  to={`/problems/${p.id}`}
                  style={{ backgroundColor: "#FFFFFF", cursor: "pointer", textDecoration: "none" }}
                >
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>{p.contest_id}</TableCell>
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
  );
};

export default Problems;
