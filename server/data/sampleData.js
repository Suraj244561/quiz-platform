export const cmsUsers = [
  { id: 1, username: 'admin', password: 'admin123', name: 'CMS Admin' },
  { id: 2, username: 'editor', password: 'editor123', name: 'Quiz Editor' }
];

export const students = [
  { id: 1, username: 'student1', password: 'student123', name: 'Aarav Sharma' },
  { id: 2, username: 'student2', password: 'student123', name: 'Diya Patel' },
  { id: 3, username: 'student3', password: 'student123', name: 'Kabir Mehta' }
];

export const questions = [
  {
    id: 101,
    question: 'What does HTTP stand for?',
    solution: 'HTTP expands to HyperText Transfer Protocol.',
    options: [
      { id: 1001, text: 'HyperText Transfer Protocol' },
      { id: 1002, text: 'High Transfer Text Protocol' },
      { id: 1003, text: 'Hyper Transfer Tool Process' },
      { id: 1004, text: 'Host Transfer Text Program' }
    ],
    correctOptionId: 1001
  },
  {
    id: 102,
    question: 'Which SQL command is used to retrieve data?',
    solution: 'SELECT is used to fetch records from a database.',
    options: [
      { id: 1005, text: 'INSERT' },
      { id: 1006, text: 'SELECT' },
      { id: 1007, text: 'UPDATE' },
      { id: 1008, text: 'DELETE' }
    ],
    correctOptionId: 1006
  },
  {
    id: 103,
    question: 'Which data structure uses FIFO ordering?',
    solution: 'A queue follows First In First Out.',
    options: [
      { id: 1009, text: 'Stack' },
      { id: 1010, text: 'Queue' },
      { id: 1011, text: 'Tree' },
      { id: 1012, text: 'Graph' }
    ],
    correctOptionId: 1010
  },
  {
    id: 104,
    question: 'Which JavaScript array method creates a new array with transformed values?',
    solution: 'map returns a new array after transforming each element.',
    options: [
      { id: 1013, text: 'forEach' },
      { id: 1014, text: 'filter' },
      { id: 1015, text: 'map' },
      { id: 1016, text: 'find' }
    ],
    correctOptionId: 1015
  },
  {
    id: 105,
    question: 'What does API stand for?',
    solution: 'API stands for Application Programming Interface.',
    options: [
      { id: 1017, text: 'Application Programming Interface' },
      { id: 1018, text: 'Advanced Program Interaction' },
      { id: 1019, text: 'Applied Protocol Integration' },
      { id: 1020, text: 'Automated Programming Input' }
    ],
    correctOptionId: 1017
  }
];

export const quizzes = [
  {
    id: 1,
    title: 'Backend Fundamentals Quiz',
    questionCount: 3,
    totalMarks: 30,
    durationMinutes: 20,
    questions: [
      { quizQuestionId: 1, orderNo: 1, questionId: 101, marks: 10 },
      { quizQuestionId: 2, orderNo: 2, questionId: 102, marks: 10 },
      { quizQuestionId: 3, orderNo: 3, questionId: 105, marks: 10 }
    ],
    createdBy: 1
  },
  {
    id: 2,
    title: 'Programming Logic Test',
    questionCount: 2,
    totalMarks: 20,
    durationMinutes: 15,
    questions: [
      { quizQuestionId: 4, orderNo: 1, questionId: 103, marks: 10 },
      { quizQuestionId: 5, orderNo: 2, questionId: 104, marks: 10 }
    ],
    createdBy: 2
  }
];

export const attempts = [
  {
    id: 1,
    quizId: 1,
    studentId: 1,
    status: 'Completed',
    startedAt: '2026-04-01T10:00:00.000Z',
    submittedAt: '2026-04-01T10:12:00.000Z',
    remainingSeconds: 480,
    answers: [
      { quizQuestionId: 1, optionId: 1001 },
      { quizQuestionId: 2, optionId: 1006 },
      { quizQuestionId: 3, optionId: 1018 }
    ]
  },
  {
    id: 2,
    quizId: 2,
    studentId: 2,
    status: 'In Progress',
    startedAt: '2026-04-02T11:00:00.000Z',
    submittedAt: null,
    remainingSeconds: 540,
    answers: [
      { quizQuestionId: 4, optionId: 1010 }
    ]
  }
];
