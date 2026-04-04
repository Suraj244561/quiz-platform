export function pickUser(user) {
  return { id: user.id, username: user.username, name: user.name };
}

export function findQuestion(questionId, store) {
  return store.questions.find((question) => question.id === questionId);
}

export function computeAttemptScore(attempt, quiz, store) {
  return quiz.questions.reduce((total, quizQuestion) => {
    const answer = attempt.answers.find((entry) => entry.quizQuestionId === quizQuestion.quizQuestionId);
    const question = findQuestion(quizQuestion.questionId, store);
    if (answer && question && answer.optionId === question.correctOptionId) return total + quizQuestion.marks;
    return total;
  }, 0);
}

export function buildReport(attempt, store) {
  const quiz = store.quizzes.find((item) => item.id === attempt.quizId);
  const student = store.students.find((item) => item.id === attempt.studentId);
  const score = computeAttemptScore(attempt, quiz, store);
  return {
    attemptId: attempt.id,
    quizTitle: quiz.title,
    studentName: student.name,
    score,
    totalMarks: quiz.totalMarks,
    status: attempt.status,
    questions: quiz.questions
      .slice()
      .sort((a, b) => a.orderNo - b.orderNo)
      .map((quizQuestion) => {
        const question = findQuestion(quizQuestion.questionId, store);
        const answer = attempt.answers.find((entry) => entry.quizQuestionId === quizQuestion.quizQuestionId);
        const selectedOption = question.options.find((option) => option.id === answer?.optionId);
        const correctOption = question.options.find((option) => option.id === question.correctOptionId);
        const awardedMarks = answer?.optionId === question.correctOptionId ? quizQuestion.marks : 0;
        return {
          orderNo: quizQuestion.orderNo,
          question: question.question,
          marks: quizQuestion.marks,
          solution: question.solution,
          correctOptionText: correctOption?.text,
          selectedOptionText: selectedOption?.text || null,
          awardedMarks
        };
      })
  };
}
