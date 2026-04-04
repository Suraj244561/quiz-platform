import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function CmsProtectedRoute({ children }) {
  const { cmsUser } = useAppContext();
  return cmsUser ? children : <Navigate to="/cms/login" replace />;
}

export function StudentProtectedRoute({ children }) {
  const { studentUser } = useAppContext();
  return studentUser ? children : <Navigate to="/student/login" replace />;
}
