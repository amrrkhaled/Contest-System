const db = require('../config/db');

exports.getAllProblems = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM problems');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM problems WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};