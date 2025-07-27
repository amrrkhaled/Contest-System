const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard.controller');

// GET /api/leaderboard/:contestId
router.get('/:contestId', leaderboardController.getLeaderboard);

module.exports = router;
