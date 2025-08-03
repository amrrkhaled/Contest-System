const db = require('../config/db');


exports.getContestById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM contests WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};