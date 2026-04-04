import { Router } from 'express';
import {
  answerQuestion,
  getQuestions,
  getQuizParticipants,
  getQuizzes,
  getReport,
  getStudentQuizList,
  postQuiz,
  startQuiz,
  submitAttempt
} from '../controllers/quizController.js';

const router = Router();
router.get('/quizzes', getQuizzes);
router.post('/quizzes', postQuiz);
router.get('/quizzes/:quizId/participants', getQuizParticipants);
router.get('/questions', getQuestions);
router.get('/students/:studentId/quizzes', getStudentQuizList);
router.post('/students/:studentId/quizzes/:quizId/start', startQuiz);
router.put('/attempts/:attemptId/answers', answerQuestion);
router.post('/attempts/:attemptId/finish', submitAttempt);
router.get('/reports/attempts/:attemptId', getReport);
export default router;
