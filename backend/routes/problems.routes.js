const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problems.controller');
const authenticate = require('../middleware/auth.middleware');


router.get('/:contestId', problemController.getAllProblemsForContest);
router.get('/:contestId/:id', problemController.getProblemById);

module.exports = router;
