import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';

const makeQuestionRow = () => ({ orderNo: '', questionId: '', marks: '' });

export default function CreateQuizPage() {
  const [step, setStep] = useState(1);
  const [catalog, setCatalog] = useState([]);
  const [form, setForm] = useState({ title: '', questionCount: 1, totalMarks: 0, durationMinutes: 30 });
  const [rows, setRows] = useState([makeQuestionRow()]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/questions').then((res) => setCatalog(res.data));
  }, []);

  useEffect(() => {
    const count = Number(form.questionCount || 0);
    setRows((current) => {
      const next = [...current];
      while (next.length < count) next.push(makeQuestionRow());
      return next.slice(0, Math.max(count, 1));
    });
  }, [form.questionCount]);

  const marksSum = useMemo(() => rows.reduce((sum, row) => sum + Number(row.marks || 0), 0), [rows]);

  const updateRow = (index, key, value) => {
    setRows((prev) => prev.map((row, i) => i === index ? { ...row, [key]: value } : row));
  };

  const nextStep = () => {
    if (!form.title.trim()) return setError('Quiz title is required.');
    if (Number(form.questionCount) <= 0) return setError('Question count must be greater than 0.');
    if (Number(form.totalMarks) <= 0) return setError('Quiz score/marks must be greater than 0.');
    if (Number(form.durationMinutes) <= 0) return setError('Duration must be greater than 0.');
    setError('');
    setStep(2);
  };

  const submit = async () => {
    setError('');
    const hasInvalid = rows.some((row) => !row.orderNo || !row.questionId || !row.marks);
    if (hasInvalid) return setError('All question rows must be completed.');
    if (marksSum !== Number(form.totalMarks)) {
      return setError('Sum of question marks must exactly match quiz score/marks.');
    }
    try {
      await api.post('/quizzes', {
        ...form,
        questionCount: Number(form.questionCount),
        totalMarks: Number(form.totalMarks),
        durationMinutes: Number(form.durationMinutes),
        questions: rows.map((row) => ({
          orderNo: Number(row.orderNo),
          questionId: Number(row.questionId),
          marks: Number(row.marks)
        }))
      });
      navigate('/cms/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to create quiz.');
    }
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">CMS</p>
          <h1>Create Quiz</h1>
        </div>
        <div className="step-indicator">Step {step} of 2</div>
      </div>
      {step === 1 ? (
        <div className="panel form-grid">
          <label>Quiz Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Number of Questions<input type="number" min="1" value={form.questionCount} onChange={(e) => setForm({ ...form, questionCount: e.target.value })} /></label>
          <label>Quiz Score / Marks<input type="number" min="1" value={form.totalMarks} onChange={(e) => setForm({ ...form, totalMarks: e.target.value })} /></label>
          <label>Duration (minutes)<input type="number" min="1" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })} /></label>
          {error ? <p className="error-text span-2">{error}</p> : null}
          <button className="btn btn-primary span-2" onClick={nextStep}>Next</button>
        </div>
      ) : (
        <div className="panel stack-gap">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Question No.</th>
                  <th>Marks</th>
                  <th>Question ID</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td><input type="number" min="1" value={row.orderNo} onChange={(e) => updateRow(index, 'orderNo', e.target.value)} /></td>
                    <td><input type="number" min="1" value={row.marks} onChange={(e) => updateRow(index, 'marks', e.target.value)} /></td>
                    <td>
                      <select value={row.questionId} onChange={(e) => updateRow(index, 'questionId', e.target.value)}>
                        <option value="">Select question</option>
                        {catalog.map((q) => <option key={q.id} value={q.id}>{q.id} - {q.question}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="helper">Assigned marks total: <strong>{marksSum}</strong> / {form.totalMarks}</p>
          {error ? <p className="error-text">{error}</p> : null}
          <div className="card-actions">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={submit}>Create Quiz</button>
          </div>
        </div>
      )}
    </section>
  );
}
