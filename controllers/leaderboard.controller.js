const db = require('../config/db');

exports.getLeaderboard = async (req, res) => {
  const { contestId } = req.params;

  try {
    const { rows } = await db.query(
      `
      SELECT
        t.id AS team_id,
        t.name AS team_name,
        COUNT(DISTINCT s.problem_id) AS solved_count,
        COALESCE(SUM(
          CASE
            WHEN s.verdict = 'Accepted' THEN
              EXTRACT(EPOCH FROM s.submitted_at - c.start_time)/60 + (
                SELECT COUNT(*) * 20
                FROM submissions s2
                WHERE
                  s2.team_id = s.team_id AND
                  s2.problem_id = s.problem_id AND
                  s2.verdict != 'Accepted' AND
                  s2.submitted_at < s.submitted_at
              )
            ELSE 0
          END
        ), 0)::INT AS total_penalty
      FROM teams t
      JOIN submissions s ON s.team_id = t.id
      JOIN contests c ON c.id = s.contest_id
      WHERE s.verdict = 'Accepted'
        AND s.contest_id = $1
      GROUP BY t.id, t.name
      ORDER BY solved_count DESC, total_penalty ASC;
      `,
      [contestId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Leaderboard Error:', err);
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
};
