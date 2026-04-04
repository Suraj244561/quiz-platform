import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useAppContext } from '../../context/AppContext';

export default function StudentLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setStudentUser } = useAppContext();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/student/login', form);
      setStudentUser(data.user);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Incorrect username/password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <form className="panel auth-panel" onSubmit={submit}>
        <p className="eyebrow">Student Login</p>
        <h1>Take your quiz</h1>
        <label>
          Username
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>
        {error ? <p className="error-text">{error}</p> : null}
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        <p className="helper">Demo student: <strong>student1 / student123</strong></p>
      </form>
    </div>
  );
}
