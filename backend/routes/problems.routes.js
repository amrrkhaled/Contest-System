const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problems.controller');
const authenticate = require('../middleware/auth.middleware');


router.get('/',authenticate, problemController.getAllProblems);
router.get('/:id',authenticate, problemController.getProblemById);

module.exports = router;
