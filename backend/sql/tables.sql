-- 1. Teams
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    institution VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Contests
CREATE TABLE contests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Problems
CREATE TABLE problems (
    id VARCHAR(10) PRIMARY KEY, -- e.g. 'A', 'B', 'C'
    contest_id INT REFERENCES contests(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    input_description TEXT,
    output_description TEXT,
    sample_input TEXT,
    sample_output TEXT,
    time_limit_ms INT NOT NULL,
    memory_limit_mb INT NOT NULL
);

-- 4. Languages
CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    extension VARCHAR(10) NOT NULL
);

-- 5. Submissions
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    contest_id INT REFERENCES contests(id) ON DELETE CASCADE,
    problem_id VARCHAR(10) REFERENCES problems(id) ON DELETE CASCADE,
    language_id INT REFERENCES languages(id),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    code TEXT NOT NULL,
    verdict VARCHAR(30),
    execution_time_ms INT,
    memory_used_kb INT
);

-- 6. Test Cases
CREATE TABLE test_cases (
    id SERIAL PRIMARY KEY,
    problem_id VARCHAR(10) REFERENCES problems(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample BOOLEAN DEFAULT FALSE
);
