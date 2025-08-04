const axios = require('axios');
const db = require('../config/db');
require('dotenv').config();

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_HEADERS = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': 'f8339d6f66msh226879f8990705cp161676jsn485a5adde2eb',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
};

// Local language_id → Judge0 language_id
const languageMap = {
  1: 54, // C++
  2: 71, // Python 3
  3: 62  // Java
};

exports.judgeSubmission = async function judgeSubmission(submissionId) {
  try {
    const { rows } = await db.query(
      `SELECT s.code, s.language_id, p.id AS problem_id
       FROM submissions s JOIN problems p ON s.problem_id = p.id
       WHERE s.id = $1`,
      [submissionId]
    );

    if (rows.length === 0) {
      console.error('❌ Submission not found');
      return;
    }

    const sub = rows[0];

    const { rows: testCases } = await db.query(
      `SELECT input, expected_output FROM test_cases
       WHERE problem_id = $1 ORDER BY is_sample DESC`,
      [sub.problem_id]
    );

    let maxTimeMs = 0;
    let maxMemoryKb = 0;

    for (const test of testCases) {
      const response = await axios.post(
        `${JUDGE0_URL}?base64_encoded=false&wait=true`,
        {
          source_code: sub.code,
          language_id: languageMap[sub.language_id],
          stdin: test.input,
          expected_output: test.expected_output
        },
        { headers: JUDGE0_HEADERS }
      );

      const result = response.data;

      // Convert seconds to milliseconds
      const timeMs = Math.round((result.time || 0) * 1000);
      const memoryKb = result.memory || 0;

      maxTimeMs = Math.max(maxTimeMs, timeMs);
      maxMemoryKb = Math.max(maxMemoryKb, memoryKb);

      if (result.status.description !== 'Accepted') {
        await db.query(
          `UPDATE submissions
           SET verdict = $1, execution_time_ms = $2, memory_used_kb = $3
           WHERE id = $4`,
          [result.status.description, timeMs, memoryKb, submissionId]
        );
        return;
      }
    }

    // All test cases passed
    await db.query(
      `UPDATE submissions
       SET verdict = 'Accepted', execution_time_ms = $1, memory_used_kb = $2
       WHERE id = $3`,
      [maxTimeMs, maxMemoryKb, submissionId]
    );

    console.log(`✅ Submission ${submissionId} Accepted`);

  } catch (err) {
    console.error('Judge API Error:', err.response?.data || err.message);
    await db.query(
      `UPDATE submissions SET verdict = 'Judge Error' WHERE id = $1`,
      [submissionId]
    );
  }
};
