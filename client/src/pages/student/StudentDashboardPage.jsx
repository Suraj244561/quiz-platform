import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { useAppContext } from '../../context/AppContext';

export default function StudentDashboardPage() {
  const { studentUser } = useAppContext();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get(`/students/${studentUser.id}/quizzes`).then((res) => setQuizzes(res.data));
  }, [studentUser.id]);

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Student</p>
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="grid two-col">
        {quizzes.map((quiz) => (
          <article className="panel" key={quiz.quizId}>
            <h3>{quiz.title}</h3>
            <p>{quiz.questionCount} questions · {quiz.totalMarks} marks · {quiz.durationMinutes} mins</p>
            <p className="helper">Status: <strong>{quiz.status}</strong></p>
            <div className="card-actions">
              {quiz.status === 'Not Started' && <Link className="btn btn-primary" to={`/student/quizzes/${quiz.quizId}/attempt`}>Start</Link>}
              {quiz.status === 'In Progress' && <Link className="btn btn-secondary" to={`/student/quizzes/${quiz.quizId}/attempt`}>Resume</Link>}
              {quiz.status === 'Completed' && <Link className="btn btn-secondary" to={`/student/reports/${quiz.attemptId}`}>View Score</Link>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
