const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problems.controller');
const authenticate = require('../middleware/auth.middleware');


router.get('/', problemController.getAllProblems);
router.get('/:id', problemController.getProblemById);

module.exports = router;
