const express = require('express');
const router = express.Router();
const {
  submit,
  getMySubmissions,
  getSubmissionById
} = require('../controllers/submission.controller');
const authenticate = require('../middleware/auth.middleware');

router.post('/', authenticate, submit);
router.get('/mine', authenticate, getMySubmissions);
router.get('/:id', authenticate, getSubmissionById);

module.exports = router;
