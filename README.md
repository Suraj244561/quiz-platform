# Sparkl Quiz Platform

A full-stack React + Node.js implementation of the Sparkl Edventure intern assignment. The project includes two separate app flows:
- CMS app for internal users to create quizzes and view participant reports.
- Student app for participants to start, resume, submit, and review quiz attempts.

## Features

### CMS Interface
- CMS login with invalid credential handling.
- Dashboard with quiz listing.
- Create Quiz step 1: title, question count, total marks, duration.
- Create Quiz step 2: map question order, marks, and question IDs.
- Participant list by quiz with status and score.
- Attempt report showing correct answers, selected answers, and marks.

### Student Interface
- Student login with invalid credential handling.
- Dashboard with Start, Resume, and View Score states.
- Timed quiz screen with one question at a time.
- Next/Previous navigation.
- Finish test flow and report screen.

### Backend/API
- REST APIs for login, quiz creation, quiz listing, participants, attempts, answers, and reports.
- Request validation and descriptive error handling.
- In-memory sample data for easy local review.
- PostgreSQL-ready SQL schema included in `database/schema.sql`.

## Tech Stack
- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express
- Database design: PostgreSQL schema included
- Runtime data: In-memory seed store for assignment demo simplicity

## Project Structure

```
sparkl-quiz-platform/
├── client/                 # React frontend
├── server/                 # Node/Express backend
├── database/schema.sql     # Relational schema
├── README.md
└── package.json            # Workspace root
```

## Setup Instructions

### 1. Install dependencies
```bash
npm install
npm run install:all
```

### 2. Start both apps
```bash
npm run dev
```

- React app: `http://localhost:5173`
- Node API: `http://localhost:4000`

### 3. Build frontend
```bash
npm run build
```

### 4. Run backend only
```bash
npm run start
```

## Demo Credentials

### CMS Users
- `admin / admin123`
- `editor / editor123`

### Students
- `student1 / student123`
- `student2 / student123`
- `student3 / student123`

## API Documentation

### Auth
- `POST /api/auth/cms/login`
  - Body: `{ "username": "admin", "password": "admin123" }`
- `POST /api/auth/student/login`
  - Body: `{ "username": "student1", "password": "student123" }`

### Quiz and Question Catalog
- `GET /api/quizzes`
- `GET /api/questions`
- `POST /api/quizzes`
  - Body:
  ```json
  {
    "title": "Node Basics Quiz",
    "questionCount": 2,
    "totalMarks": 20,
    "durationMinutes": 15,
    "questions": [
      { "orderNo": 1, "questionId": 101, "marks": 10 },
      { "orderNo": 2, "questionId": 102, "marks": 10 }
    ]
  }
  ```

### CMS Reporting
- `GET /api/quizzes/:quizId/participants`
- `GET /api/reports/attempts/:attemptId`

### Student Workflow
- `GET /api/students/:studentId/quizzes`
- `POST /api/students/:studentId/quizzes/:quizId/start`
- `PUT /api/attempts/:attemptId/answers`
  - Body: `{ "quizQuestionId": 1, "optionId": 1001 }`
- `POST /api/attempts/:attemptId/finish`

## Database Design Notes

The relational model separates reusable question bank data from quiz composition:
- `questions` stores the main question and solution.
- `question_options` stores options and correct answer flags.
- `quizzes` stores quiz metadata.
- `quiz_questions` maps questions into quizzes with order and marks.
- `quiz_attempts` stores per-student status, timer state, and score.
- `attempt_answers` stores chosen options and awarded marks.

## Assumptions Made
- Authentication is simplified for assignment evaluation and uses seeded users without JWT/session handling.
- The backend uses in-memory storage to make the project run instantly for reviewers without DB setup.
- A PostgreSQL schema is included to show the production-ready database design expected by the assignment.
- Timer countdown is handled on the frontend for the demo; backend stores remaining seconds in the attempt structure.
- The CMS report and student report reuse the same report payload because both views require answer-level results.
- Passwords are plain text only for this demo assignment; in production they must be hashed.

## Suggested Production Improvements
- Add JWT auth and role-based authorization.
- Persist quiz and attempt data in PostgreSQL.
- Add password hashing with bcrypt.
- Store timer state and auto-submit logic server-side.
- Add unit/integration tests.
- Deploy frontend and backend separately.
