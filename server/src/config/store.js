import { cmsUsers, students, questions, quizzes, attempts } from '../../data/sampleData.js';

export const store = {
  cmsUsers: structuredClone(cmsUsers),
  students: structuredClone(students),
  questions: structuredClone(questions),
  quizzes: structuredClone(quizzes),
  attempts: structuredClone(attempts)
};
