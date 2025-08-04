import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import axios from "axios";

const ProblemDetails = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/problems/${id}`)
        .then(res => setProblem(res.data))
        .catch(err => {
        console.error("Problem fetch failed:", err);
        setNotFound(true);
        });
    }, [id]);

    if (notFound || !problem)
        return <Typography style={{ display: "flex", justifyContent: "center", height: "89vh", alignItems: "center" }} variant="h5">Problem not found</Typography>;

    return (
        <div style={{ padding: "2rem", backgroundColor: "#EEEEEE", minHeight: "89vh" }}>
        <Paper style={{ padding: "1.5rem", backgroundColor: "#FFFFFF", borderRadius: "10px", marginTop: "5rem" }}>
            <Typography variant="h4" gutterBottom style={{ color: "#0F044C", fontWeight: "bold" }}>{problem.title}</Typography>

            <Typography variant="body2" style={{ marginTop: "1rem", color: "#787A91" }}>
                Time Limit: {problem.time_limit_ms} ms | Memory Limit: {problem.memory_limit_mb} MB
            </Typography>

            <br/>

            <Typography variant="body1" paragraph>{problem.description}</Typography>

            <Typography variant="h6" style={{ color: "#141E61" }}>Input</Typography>
            <Typography variant="body2" paragraph>{problem.input_description}</Typography>

            <Typography variant="h6" style={{ color: "#141E61" }}>Output</Typography>
            <Typography variant="body2" paragraph>{problem.output_description}</Typography>

            <Typography variant="h6" style={{ color: "#141E61" }}>Sample Input</Typography>
            <Paper style={{ backgroundColor: "#f5f5f5", padding: "0.5rem", marginBottom: "1rem" }}>
                <pre>{problem.sample_input}</pre>
            </Paper>

            <Typography variant="h6" style={{ color: "#141E61" }}>Sample Output</Typography>
            <Paper style={{ backgroundColor: "#f5f5f5", padding: "0.5rem", marginBottom: "1rem" }}>
                <pre>{problem.sample_output}</pre>
            </Paper>
        </Paper>
        </div>
    );
};

export default ProblemDetails;
