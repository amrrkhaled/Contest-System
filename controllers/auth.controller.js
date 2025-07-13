const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { name, password, institution } = req.body;
  if (!name || !password) return res.status(400).json({ error: 'Name and password required' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO teams (name, password, institution) VALUES ($1, $2, $3) RETURNING id`,
      [name, hash, institution]
    );

    const token = jwt.sign({ id: result.rows[0].id, name }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Team name already taken' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json({ error: 'Name and password required' });

  try {
    const result = await db.query(`SELECT id, password FROM teams WHERE name = $1`, [name]);

    if (result.rowCount === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, result.rows[0].password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: result.rows[0].id, name }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
