import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function HomeLayout() {
  return (
    <div className="shell shell-home">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Intern Assignment</p>
          <h1>Sparkl Quiz Platform</h1>
          <p className="lede">A full-stack quiz management and student assessment platform with separate CMS and Student workflows.</p>
        </div>
        <div className="home-actions">
          <Link className="btn btn-primary" to="/cms/login">Open CMS App</Link>
          <Link className="btn btn-secondary" to="/student/login">Open Student App</Link>
        </div>
      </div>
    </div>
  );
}

export function CmsLayout() {
  const { cmsUser, setCmsUser } = useAppContext();
  const navigate = useNavigate();

  const logout = () => {
    setCmsUser(null);
    navigate('/cms/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Internal CMS</p>
          <h2>Sparkl Admin</h2>
        </div>
        <nav className="nav-list">
          <NavLink to="/cms/dashboard">Dashboard</NavLink>
          <NavLink to="/cms/create">Create Quiz</NavLink>
        </nav>
        <div className="user-card">
          <span>Logged in as</span>
          <strong>{cmsUser?.name}</strong>
          <button className="btn btn-ghost" onClick={logout}>Logout</button>
        </div>
      </aside>
      <main className="content"><Outlet /></main>
    </div>
  );
}

export function StudentLayout() {
  const { studentUser, setStudentUser } = useAppContext();
  const navigate = useNavigate();

  const logout = () => {
    setStudentUser(null);
    navigate('/student/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Student Portal</p>
          <h2>Assessments</h2>
        </div>
        <nav className="nav-list">
          <NavLink to="/student/dashboard">Dashboard</NavLink>
        </nav>
        <div className="user-card">
          <span>Logged in as</span>
          <strong>{studentUser?.name}</strong>
          <button className="btn btn-ghost" onClick={logout}>Logout</button>
        </div>
      </aside>
      <main className="content"><Outlet /></main>
    </div>
  );
}
