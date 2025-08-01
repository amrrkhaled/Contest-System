const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contest.controller');
const authenticate = require('../middleware/auth.middleware');


router.get('/:id', contestController.getContestById);

module.exports = router;
