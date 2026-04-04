import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/client';
import { useAppContext } from '../../context/AppContext';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function AttemptQuizPage() {
  const { quizId } = useParams();
  const { studentUser } = useAppContext();
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.post(`/students/${studentUser.id}/quizzes/${quizId}/start`).then((res) => {
      setSession(res.data);
      setTimeLeft(res.data.remainingSeconds);
    });
  }, [quizId, studentUser.id]);

  useEffect(() => {
    if (!session) return;
    if (timeLeft <= 0) {
      api.post(`/attempts/${session.attempt.id}/finish`).then(() => navigate('/student/dashboard'));
      return;
    }
    const timer = setInterval(() => setTimeLeft((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, session, navigate]);

  const currentQuestion = useMemo(() => session?.questions[currentIndex], [session, currentIndex]);

  const selectOption = async (optionId) => {
    if (!session || !currentQuestion) return;
    const { data } = await api.put(`/attempts/${session.attempt.id}/answers`, {
      quizQuestionId: currentQuestion.quizQuestionId,
      optionId
    });
    setSession(data);
  };

  const finish = async () => {
    await api.post(`/attempts/${session.attempt.id}/finish`);
    navigate('/student/dashboard');
  };

  if (!session || !currentQuestion) return <p>Loading quiz...</p>;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Live Test</p>
          <h1>{session.quiz.title}</h1>
        </div>
        <div className="timer-chip">Time Left: {formatTime(timeLeft)}</div>
      </div>
      <article className="panel stack-gap">
        <div>
          <p className="helper">Question {currentIndex + 1} of {session.questions.length}</p>
          <h2>{currentQuestion.question}</h2>
        </div>
        <div className="options-list">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className={`option-btn ${currentQuestion.selectedOptionId === option.id ? 'selected' : ''}`}
              onClick={() => selectOption(option.id)}
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="card-actions">
          <button className="btn btn-secondary" disabled={currentIndex === 0} onClick={() => setCurrentIndex((i) => i - 1)}>Previous</button>
          <button className="btn btn-secondary" disabled={currentIndex === session.questions.length - 1} onClick={() => setCurrentIndex((i) => i + 1)}>Next</button>
          <button className="btn btn-primary" onClick={finish}>Finish Test</button>
        </div>
      </article>
    </section>
  );
}
