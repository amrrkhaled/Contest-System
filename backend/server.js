require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
// const contestRoutes = require('./routes/contest.routes');
// const problemRoutes = require('./routes/problem.routes');
const submissionRoutes = require('./routes/submission.routes');
const leaderboardRoutes = require('./routes/leaderboard.routes');

app.use('/api/leaderboard', leaderboardRoutes);
// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/contests', contestRoutes);
// app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Contest System API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
