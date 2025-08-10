const db = require('../config/db');

exports.getProblemById = async (req, res) => {
  const { contestId, id } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM problems WHERE contest_id = $1 AND id = $2',
      [contestId, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProblemsForContest = async (req, res) => {
  const { contestId } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM problems WHERE contest_id = $1',
      [contestId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};