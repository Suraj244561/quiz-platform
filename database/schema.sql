CREATE TABLE cms_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  solution_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_options (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  question_count INT NOT NULL,
  total_marks INT NOT NULL,
  duration_minutes INT NOT NULL,
  created_by INT REFERENCES cms_users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_id INT NOT NULL REFERENCES questions(id),
  order_no INT NOT NULL,
  marks INT NOT NULL,
  UNIQUE (quiz_id, order_no),
  UNIQUE (quiz_id, question_id)
);

CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
  started_at TIMESTAMP,
  submitted_at TIMESTAMP,
  score INT,
  remaining_seconds INT,
  UNIQUE (quiz_id, student_id)
);

CREATE TABLE attempt_answers (
  id SERIAL PRIMARY KEY,
  attempt_id INT NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  quiz_question_id INT NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option_id INT REFERENCES question_options(id),
  awarded_marks INT DEFAULT 0,
  UNIQUE (attempt_id, quiz_question_id)
);

CREATE INDEX idx_quiz_attempts_student ON quiz_attempts(student_id);
CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);
