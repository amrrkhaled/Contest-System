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

// Admin leaderboard (all teams with details)
exports.adminLeaderboard = async (req, res) => {
  try {
    const { rows } = await db.query(
      `
      WITH penalty_calc AS (
        SELECT
          s.team_id,
          s.problem_id,
          MIN(
            EXTRACT(EPOCH FROM s.submitted_at - c.start_time) / 60
            + (
              SELECT COUNT(*) * 20
              FROM submissions s2
              WHERE
                s2.team_id = s.team_id
                AND s2.problem_id = s.problem_id
                AND s2.verdict != 'Accepted'
                AND s2.submitted_at < s.submitted_at
            )
          ) AS penalty
        FROM submissions s
        JOIN contests c ON c.id = s.contest_id
        WHERE s.verdict = 'Accepted' AND c.id = $1
        GROUP BY s.team_id, s.problem_id
      )
      SELECT
        t.id AS team_id,
        t.name AS team_name,

        COUNT(DISTINCT s.problem_id) FILTER (WHERE s.verdict = 'Accepted') AS solved_count,
        COUNT(s.id) AS total_submissions,
        COUNT(s.id) FILTER (WHERE s.verdict != 'Accepted') AS wrong_submissions,

        COALESCE(ARRAY_AGG(DISTINCT p.id) FILTER (WHERE s.verdict = 'Accepted'), '{}') AS solved_problem_ids,
        COALESCE(ARRAY_AGG(DISTINCT p.title) FILTER (WHERE s.verdict = 'Accepted'), '{}') AS solved_problem_titles,
        COALESCE(ARRAY_AGG(DISTINCT p.id) FILTER (WHERE s.verdict != 'Accepted'), '{}') AS attempted_problem_ids,

        MAX(s.submitted_at) AS last_submission_time,

        COALESCE(SUM(pc.penalty), 0)::INT AS total_penalty,

        ROUND(
          COALESCE(SUM(pc.penalty), 0)::NUMERIC
          / NULLIF(COUNT(DISTINCT s.problem_id) FILTER (WHERE s.verdict = 'Accepted'), 0),
          2
        ) AS avg_penalty_per_solved

      FROM teams t
      LEFT JOIN submissions s ON s.team_id = t.id
      LEFT JOIN contests c ON c.id = s.contest_id
      LEFT JOIN problems p ON p.id = s.problem_id AND p.contest_id = c.id
      LEFT JOIN penalty_calc pc ON pc.team_id = t.id AND pc.problem_id = s.problem_id
      WHERE c.id = $1
      GROUP BY t.id, t.name
      ORDER BY solved_count DESC, total_penalty ASC;
      `,
      [req.params.contestId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Leaderboard Error:', err);
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
};

// Admin leaderboard for a single team
exports.adminLeaderboardTeamByID = async (req, res) => {
  try {
    const { contestId, teamId } = req.params;

    const { rows } = await db.query(
      `
      WITH first_accepts AS (
        SELECT
          s.team_id,
          s.problem_id,
          MIN(s.submitted_at) AS first_accepted_at
        FROM submissions s
        WHERE s.verdict = 'Accepted'
          AND s.contest_id = $1
          AND s.team_id = $2
        GROUP BY s.team_id, s.problem_id
      ),
      penalty_calc AS (
        SELECT
          s.team_id,
          s.problem_id,
          MIN(
            EXTRACT(EPOCH FROM s.submitted_at - c.start_time) / 60
            + (
              SELECT COUNT(*) * 20
              FROM submissions s2
              WHERE
                s2.team_id = s.team_id
                AND s2.problem_id = s.problem_id
                AND s2.verdict != 'Accepted'
                AND s2.submitted_at < s.submitted_at
            )
          ) AS penalty
        FROM submissions s  
        JOIN contests c ON c.id = s.contest_id
        WHERE s.verdict = 'Accepted'
          AND c.id = $1
          AND s.team_id = $2
        GROUP BY s.team_id, s.problem_id
      )
      SELECT
        t.id AS team_id,
        t.name AS team_name,

        COUNT(DISTINCT fa.problem_id) AS solved_count,
        COUNT(s.id) AS total_submissions,
        COUNT(s.id) FILTER (WHERE s.verdict != 'Accepted') AS wrong_submissions,

        COALESCE(
          JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
              'id', p.id,
              'title', p.title,
              'accepted_at', fa.first_accepted_at,
              'wrong_attempts_before', (
                SELECT COUNT(*)
                FROM submissions s2
                WHERE s2.team_id = t.id
                  AND s2.problem_id = p.id
                  AND s2.verdict != 'Accepted'
                  AND s2.submitted_at < fa.first_accepted_at
              )
            )
          ) FILTER (WHERE fa.problem_id IS NOT NULL),
          '[]'
        ) AS solved_problems,

        COALESCE(
          JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
              'id', p.id,
              'title', p.title
            )
          ) FILTER (
            WHERE fa.problem_id IS NULL AND s.verdict != 'Accepted'
          ),
          '[]'
        ) AS attempted_problems,

        COALESCE(
          JSON_AGG(
            JSONB_BUILD_OBJECT(
              'id', s.id,
              'problem_id', s.problem_id,
              'verdict', s.verdict,
              'submitted_at', s.submitted_at
            )
            ORDER BY s.submitted_at
          ),
          '[]'
        ) AS submissions,

        COALESCE(SUM(pc.penalty), 0)::INT AS total_penalty

      FROM teams t
      LEFT JOIN submissions s ON s.team_id = t.id
      LEFT JOIN contests c ON c.id = s.contest_id
      LEFT JOIN problems p ON p.id = s.problem_id AND p.contest_id = c.id
      LEFT JOIN first_accepts fa ON fa.team_id = t.id AND fa.problem_id = p.id
      LEFT JOIN penalty_calc pc ON pc.team_id = t.id AND pc.problem_id = p.id
      WHERE c.id = $1 AND t.id = $2
      GROUP BY t.id, t.name
      `,
      [contestId, teamId]
    );

    res.json(rows[0] || {});
  } catch (err) {
    console.error('Leaderboard Error:', err);
    res.status(500).json({ error: 'Failed to load team leaderboard' });
  }
};
