const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problems.controller');
const authenticate = require('../middleware/auth.middleware');


router.get('/:contestId', problemController.getAllProblemsForContest);
router.get('/:contestId/:id', problemController.getProblemById);
router.get('/:contestId/:id/test-cases', problemController.getAllTestCasesForProblem);

module.exports = router;
