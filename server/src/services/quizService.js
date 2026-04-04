import { store } from '../config/store.js';
import { buildReport, computeAttemptScore, findQuestion } from '../utils/helpers.js';

function getQuizSummary(quiz) {
  return {
    id: quiz.id,
    title: quiz.title,
    questionCount: quiz.questionCount,
    totalMarks: quiz.totalMarks,
    durationMinutes: quiz.durationMinutes
  };
}

export function loginCms(username, password) {
  const user = store.cmsUsers.find((item) => item.username === username && item.password === password);
  return user || null;
}

export function loginStudent(username, password) {
  const user = store.students.find((item) => item.username === username && item.password === password);
  return user || null;
}

export function listQuizzes() {
  return store.quizzes.map(getQuizSummary);
}

export function listQuestions() {
  return store.questions.map((question) => ({ id: question.id, question: question.question }));
}

export function createQuiz(payload, createdBy) {
  const { title, questionCount, totalMarks, durationMinutes, questions } = payload;
  if (!title?.trim()) throw new Error('Quiz title is required.');
  if (questionCount <= 0 || totalMarks <= 0 || durationMinutes <= 0) throw new Error('Question count, marks and duration must be greater than zero.');
  if (!Array.isArray(questions) || questions.length !== questionCount) throw new Error('Questions array must match the declared question count.');
  const marksSum = questions.reduce((sum, item) => sum + Number(item.marks || 0), 0);
  if (marksSum !== totalMarks) throw new Error('Question marks total must equal quiz total marks.');

  const seenOrders = new Set();
  const seenQuestionIds = new Set();
  for (const row of questions) {
    if (seenOrders.has(row.orderNo)) throw new Error('Question order numbers must be unique.');
    if (seenQuestionIds.has(row.questionId)) throw new Error('Duplicate question IDs are not allowed in a quiz.');
    const exists = store.questions.some((question) => question.id === row.questionId);
    if (!exists) throw new Error(`Question ID ${row.questionId} does not exist.`);
    seenOrders.add(row.orderNo);
    seenQuestionIds.add(row.questionId);
  }

  const nextQuizId = Math.max(...store.quizzes.map((quiz) => quiz.id), 0) + 1;
  const nextQuizQuestionId = Math.max(...store.quizzes.flatMap((quiz) => quiz.questions.map((item) => item.quizQuestionId)), 0) + 1;
  const quiz = {
    id: nextQuizId,
    title: title.trim(),
    questionCount,
    totalMarks,
    durationMinutes,
    createdBy,
    questions: questions.map((item, index) => ({
      quizQuestionId: nextQuizQuestionId + index,
      orderNo: item.orderNo,
      questionId: item.questionId,
      marks: item.marks
    }))
  };
  store.quizzes.push(quiz);
  return getQuizSummary(quiz);
}

export function getParticipants(quizId) {
  const quiz = store.quizzes.find((item) => item.id === Number(quizId));
  if (!quiz) throw new Error('Quiz not found.');
  const participants = store.students.map((student) => {
    const attempt = store.attempts.find((item) => item.quizId === quiz.id && item.studentId === student.id);
    if (!attempt) {
      return {
        studentId: student.id,
        studentName: student.name,
        status: 'Not Started',
        score: null,
        attemptId: `none-${student.id}`
      };
    }
    return {
      studentId: student.id,
      studentName: student.name,
      status: attempt.status,
      score: attempt.status === 'Completed' ? computeAttemptScore(attempt, quiz, store) : null,
      attemptId: attempt.id
    };
  });
  return { quiz: getQuizSummary(quiz), participants };
}

export function getStudentQuizzes(studentId) {
  return store.quizzes.map((quiz) => {
    const attempt = store.attempts.find((item) => item.quizId === quiz.id && item.studentId === Number(studentId));
    return {
      quizId: quiz.id,
      attemptId: attempt?.id || null,
      title: quiz.title,
      questionCount: quiz.questionCount,
      totalMarks: quiz.totalMarks,
      durationMinutes: quiz.durationMinutes,
      status: attempt ? attempt.status : 'Not Started'
    };
  });
}

export function startOrResumeQuiz(studentId, quizId) {
  const quiz = store.quizzes.find((item) => item.id === Number(quizId));
  if (!quiz) throw new Error('Quiz not found.');
  let attempt = store.attempts.find((item) => item.quizId === quiz.id && item.studentId === Number(studentId));
  if (!attempt) {
    attempt = {
      id: Math.max(...store.attempts.map((item) => item.id), 0) + 1,
      quizId: quiz.id,
      studentId: Number(studentId),
      status: 'In Progress',
      startedAt: new Date().toISOString(),
      submittedAt: null,
      remainingSeconds: quiz.durationMinutes * 60,
      answers: []
    };
    store.attempts.push(attempt);
  }
  const questions = quiz.questions
    .slice()
    .sort((a, b) => a.orderNo - b.orderNo)
    .map((quizQuestion) => {
      const question = findQuestion(quizQuestion.questionId, store);
      const existingAnswer = attempt.answers.find((answer) => answer.quizQuestionId === quizQuestion.quizQuestionId);
      return {
        quizQuestionId: quizQuestion.quizQuestionId,
        orderNo: quizQuestion.orderNo,
        marks: quizQuestion.marks,
        question: question.question,
        options: question.options,
        selectedOptionId: existingAnswer?.optionId || null
      };
    });
  return { quiz: getQuizSummary(quiz), attempt, questions, remainingSeconds: attempt.remainingSeconds };
}

export function saveAnswer(attemptId, quizQuestionId, optionId) {
  const attempt = store.attempts.find((item) => item.id === Number(attemptId));
  if (!attempt) throw new Error('Attempt not found.');
  if (attempt.status === 'Completed') throw new Error('Attempt already completed.');
  const quiz = store.quizzes.find((item) => item.id === attempt.quizId);
  const targetQuestion = quiz.questions.find((item) => item.quizQuestionId === Number(quizQuestionId));
  if (!targetQuestion) throw new Error('Quiz question not found.');
  const question = findQuestion(targetQuestion.questionId, store);
  const optionExists = question.options.some((option) => option.id === Number(optionId));
  if (!optionExists) throw new Error('Option does not belong to the question.');

  const answerIndex = attempt.answers.findIndex((item) => item.quizQuestionId === Number(quizQuestionId));
  if (answerIndex >= 0) attempt.answers[answerIndex] = { quizQuestionId: Number(quizQuestionId), optionId: Number(optionId) };
  else attempt.answers.push({ quizQuestionId: Number(quizQuestionId), optionId: Number(optionId) });

  return startOrResumeQuiz(attempt.studentId, attempt.quizId);
}

export function finishAttempt(attemptId) {
  const attempt = store.attempts.find((item) => item.id === Number(attemptId));
  if (!attempt) throw new Error('Attempt not found.');
  attempt.status = 'Completed';
  attempt.submittedAt = new Date().toISOString();
  return buildReport(attempt, store);
}

export function getAttemptReport(attemptId) {
  const attempt = store.attempts.find((item) => item.id === Number(attemptId));
  if (!attempt) throw new Error('Attempt not found.');
  return buildReport(attempt, store);
}
