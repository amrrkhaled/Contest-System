const db = require('../config/db');
const { judgeSubmission } = require('../judge/judgeSubmission');

// ✅ Submit a new solution
exports.submit = async (req, res) => {
  const { problem_id, language_id, code } = req.body;
  const team_id = req.user.id; // From JWT token

  if (!problem_id || !language_id || !code) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const result = await db.query(
      `INSERT INTO submissions (team_id, contest_id, problem_id, language_id, code, verdict)
       VALUES (
         $1,
         (SELECT contest_id FROM problems WHERE id = $2),
         $2, $3, $4, 'Pending'
       ) RETURNING id`,
      [team_id, problem_id, language_id, code]
    );

    const submissionId = result.rows[0].id;

    // 🔥 Trigger judge logic
    judgeSubmission(submissionId);

    res.status(201).json({ message: 'Submission received', submissionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Submission failed' });
  }
};

// ✅ Get all submissions of the current team
exports.getMySubmissions = async (req, res) => {
  const teamId = req.user.id;

  try {
    const { rows } = await db.query(
      `SELECT s.id, s.problem_id, p.title, s.verdict, s.submitted_at
       FROM submissions s
       JOIN problems p ON p.id = s.problem_id
       WHERE s.team_id = $1
       ORDER BY s.submitted_at DESC`,
      [teamId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

// ✅ Get one submission by ID (only if owned by current team)
exports.getSubmissionById = async (req, res) => {
  const teamId = req.user.id;
  const submissionId = req.params.id;

  try {
    const { rows } = await db.query(
      `SELECT s.id, s.problem_id, p.title, s.verdict, s.code, s.submitted_at, s.execution_time_ms
       FROM submissions s
       JOIN problems p ON s.problem_id = p.id
       WHERE s.id = $1 AND s.team_id = $2`,
      [submissionId, teamId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching submission:', err);
    res.status(500).json({ error: 'Could not fetch submission' });
  }
};
