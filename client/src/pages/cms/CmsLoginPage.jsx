import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useAppContext } from '../../context/AppContext';

export default function CmsLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCmsUser } = useAppContext();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/cms/login', form);
      setCmsUser(data.user);
      navigate('/cms/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Incorrect username/password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <form className="panel auth-panel" onSubmit={submit}>
        <p className="eyebrow">CMS Login</p>
        <h1>Welcome back</h1>
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
        <p className="helper">Demo CMS user: <strong>admin / admin123</strong></p>
      </form>
    </div>
  );
}
