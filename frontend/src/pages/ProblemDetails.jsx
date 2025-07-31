import { useParams } from "react-router-dom";
import { Typography, Paper } from "@mui/material";

const dummyProblems = {
    A: {
        title: "Two Sum",
        description: "Find two numbers in an array that sum to a target value.",
        input_description: "First line: n, Second line: n integers, Third line: target value.",
        output_description: "Indices of the two numbers.",
        sample_input: "4\n2 7 11 15\n9",
        sample_output: "0 1",
        time_limit_ms: 1000,
        memory_limit_mb: 256,
    },

    B: {
        title: "String Reversal",
        description: "Reverse the given string.",
        input_description: "Single string s.",
        output_description: "The reversed string.",
        sample_input: "hello",
        sample_output: "olleh",
        time_limit_ms: 2000,
        memory_limit_mb: 256,
    },

    C: {
        title: "Graph Paths",
        description: "Count all distinct paths between two nodes in a directed graph.",
        input_description: "n m edges start end.",
        output_description: "Number of distinct paths.",
        sample_input: "4 4\n1 2\n2 3\n3 4\n1 4",
        sample_output: "2",
        time_limit_ms: 2000,
        memory_limit_mb: 512,
    },

    D: {
        title: "Binary Search",
        description: "Implement binary search on a sorted array.",
        input_description: "n array elements target value.",
        output_description: "Index of the target or -1.",
        sample_input: "5\n1 3 5 7 9\n7",
        sample_output: "3",
        time_limit_ms: 1000,
        memory_limit_mb: 128,
    },

    E: {
        title: "Sorting Arrays",
        description: "Sort an array in ascending order.",
        input_description: "n array elements.",
        output_description: "Sorted array.",
        sample_input: "5\n4 2 5 3 1",
        sample_output: "1 2 3 4 5",
        time_limit_ms: 1500,
        memory_limit_mb: 128,
    },

    F: {
        title: "Prime Checker",
        description: "Check if a number is prime.",
        input_description: "Single integer n.",
        output_description: "YES if prime, NO otherwise.",
        sample_input: "7",
        sample_output: "YES",
        time_limit_ms: 1000,
        memory_limit_mb: 64,
    },

    G: {
        title: "Matrix Multiplication",
        description: "Multiply two matrices.",
        input_description: "Dimensions and elements of two matrices.",
        output_description: "Resulting matrix.",
        sample_input: "2 2\n1 2\n3 4\n2 2\n5 6\n7 8",
        sample_output: "19 22\n43 50",
        time_limit_ms: 3000,
        memory_limit_mb: 512,
    },

    H: {
        title: "Palindrome Checker",
        description: "Check if a string is a palindrome.",
        input_description: "Single string s.",
        output_description: "YES if palindrome, NO otherwise.",
        sample_input: "madam",
        sample_output: "YES",
        time_limit_ms: 1000,
        memory_limit_mb: 64,
    },
    
    I: {
        title: "Knapsack Problem",
        description: "Solve 0/1 Knapsack problem using dynamic programming.",
        input_description: "n W values weights.",
        output_description: "Maximum achievable value.",
        sample_input: "3 50\n60 100 120\n10 20 30",
        sample_output: "220",
        time_limit_ms: 3000,
        memory_limit_mb: 256,
    },

    J: {
        title: "Minimum Spanning Tree",
        description: "Find the weight of the minimum spanning tree.",
        input_description: "n m edges (u v w).",
        output_description: "Weight of MST.",
        sample_input: "4 5\n1 2 1\n2 3 2\n3 4 3\n4 1 4\n1 3 5",
        sample_output: "6",
        time_limit_ms: 3000,
        memory_limit_mb: 512,
    },

    K: {
        title: "Dijkstra's Algorithm",
        description: "Find shortest path from source to all vertices.",
        input_description: "n m edges source.",
        output_description: "Shortest distances to all vertices.",
        sample_input: "5 6\n1 2 2\n1 3 4\n2 3 1\n2 4 7\n3 5 3\n4 5 1\n1",
        sample_output: "0 2 3 9 6",
        time_limit_ms: 3000,
        memory_limit_mb: 256,
    },
};

const ProblemDetails = () => {
    const { id } = useParams();
    const problem = dummyProblems[id];

    if (!problem) 
        return <Typography style={{display: "flex", justifyContent: "center", height: "89vh", alignItems: "center"}} variant="h5">Problem not found</Typography>;

    return (
        <div style={{ padding: "2rem", backgroundColor: "#EEEEEE", minHeight: "89vh" }}>
            <Paper style={{ padding: "1.5rem", backgroundColor: "#FFFFFF", borderRadius: "10px", marginTop: "5rem" }}>
                <Typography variant="h4" gutterBottom style={{ color: "#0F044C", fontWeight: "bold" }}>{problem.title}</Typography>

                <Typography variant="body2" style={{ marginTop: "1rem", color: "#787A91" }}>
                    Time Limit: {problem.time_limit_ms} ms | Memory Limit: {problem.memory_limit_mb} MB
                </Typography>

                <br />
                
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
