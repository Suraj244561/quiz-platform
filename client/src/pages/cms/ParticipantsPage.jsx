import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/client';

export default function ParticipantsPage() {
  const { quizId } = useParams();
  const [data, setData] = useState({ quiz: null, participants: [] });

  useEffect(() => {
    api.get(`/quizzes/${quizId}/participants`).then((res) => setData(res.data));
  }, [quizId]);

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">CMS</p>
          <h1>{data.quiz?.title || 'Quiz'} Participants</h1>
        </div>
      </div>
      <div className="panel table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Status</th>
              <th>Score</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {data.participants.map((participant) => (
              <tr key={participant.attemptId}>
                <td>{participant.studentName}</td>
                <td>{participant.status}</td>
                <td>{participant.score ?? '-'}</td>
                <td>{participant.status === 'Completed' ? <Link to={`/cms/reports/${participant.attemptId}`}>View Report</Link> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
