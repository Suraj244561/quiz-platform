import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export default function CmsDashboardPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get('/quizzes').then((res) => setQuizzes(res.data));
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">CMS</p>
          <h1>Dashboard</h1>
        </div>
        <Link className="btn btn-primary" to="/cms/create">Create Quiz</Link>
      </div>
      <div className="grid two-col">
        {quizzes.map((quiz) => (
          <article key={quiz.id} className="panel">
            <h3>{quiz.title}</h3>
            <p>{quiz.questionCount} questions · {quiz.totalMarks} marks · {quiz.durationMinutes} mins</p>
            <div className="card-actions">
              <Link className="btn btn-secondary" to={`/cms/quizzes/${quiz.id}/participants`}>View Participants</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
