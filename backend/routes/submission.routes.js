const express = require('express');
const router = express.Router();
const {
  submit,
  getMySubmissions,
  getSubmissionById,
  getSolvedCount,
} = require('../controllers/submission.controller');
const authenticate = require('../middleware/auth.middleware');

router.post('/', authenticate, submit);
router.get('/mine', authenticate, getMySubmissions);
router.get('/solved-count', authenticate, getSolvedCount);
router.get('/:id', authenticate, getSubmissionById);

module.exports = router;
