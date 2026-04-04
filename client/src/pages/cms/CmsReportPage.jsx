import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/client';

export default function CmsReportPage() {
  const { attemptId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get(`/reports/attempts/${attemptId}`).then((res) => setReport(res.data));
  }, [attemptId]);

  if (!report) return <p>Loading...</p>;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">CMS</p>
          <h1>{report.studentName} — {report.quizTitle}</h1>
        </div>
        <div className="score-chip">Score: {report.score} / {report.totalMarks}</div>
      </div>
      <div className="stack-gap">
        {report.questions.map((item) => (
          <article key={item.orderNo} className="panel">
            <h3>Q{item.orderNo}. {item.question}</h3>
            <p><strong>Correct Answer:</strong> {item.correctOptionText}</p>
            <p><strong>Student Chosen Option:</strong> {item.selectedOptionText || 'Not answered'}</p>
            <p><strong>Marks:</strong> {item.awardedMarks} / {item.marks}</p>
            <p className="helper">Solution: {item.solution}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
