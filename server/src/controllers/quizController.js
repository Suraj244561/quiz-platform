import {
  createQuiz,
  finishAttempt,
  getAttemptReport,
  getParticipants,
  getStudentQuizzes,
  listQuestions,
  listQuizzes,
  saveAnswer,
  startOrResumeQuiz
} from '../services/quizService.js';

export function getQuizzes(req, res) { res.json(listQuizzes()); }
export function getQuestions(req, res) { res.json(listQuestions()); }
export function postQuiz(req, res, next) {
  try {
    const quiz = createQuiz(req.body, 1);
    res.status(201).json(quiz);
  } catch (error) { next(error); }
}
export function getQuizParticipants(req, res, next) {
  try { res.json(getParticipants(req.params.quizId)); } catch (error) { next(error); }
}
export function getStudentQuizList(req, res, next) {
  try { res.json(getStudentQuizzes(req.params.studentId)); } catch (error) { next(error); }
}
export function startQuiz(req, res, next) {
  try { res.json(startOrResumeQuiz(req.params.studentId, req.params.quizId)); } catch (error) { next(error); }
}
export function answerQuestion(req, res, next) {
  try { res.json(saveAnswer(req.params.attemptId, req.body.quizQuestionId, req.body.optionId)); } catch (error) { next(error); }
}
export function submitAttempt(req, res, next) {
  try { res.json(finishAttempt(req.params.attemptId)); } catch (error) { next(error); }
}
export function getReport(req, res, next) {
  try { res.json(getAttemptReport(req.params.attemptId)); } catch (error) { next(error); }
}
