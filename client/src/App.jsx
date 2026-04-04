import { Navigate, Route, Routes } from 'react-router-dom';
import { CmsLayout, HomeLayout, StudentLayout } from './components/Layout';
import { CmsProtectedRoute, StudentProtectedRoute } from './components/ProtectedRoute';
import CmsLoginPage from './pages/cms/CmsLoginPage';
import CmsDashboardPage from './pages/cms/CmsDashboardPage';
import CreateQuizPage from './pages/cms/CreateQuizPage';
import ParticipantsPage from './pages/cms/ParticipantsPage';
import CmsReportPage from './pages/cms/CmsReportPage';
import StudentLoginPage from './pages/student/StudentLoginPage';
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import AttemptQuizPage from './pages/student/AttemptQuizPage';
import StudentReportPage from './pages/student/StudentReportPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/cms/login" element={<CmsLoginPage />} />
      <Route path="/student/login" element={<StudentLoginPage />} />

      <Route path="/cms" element={<CmsProtectedRoute><CmsLayout /></CmsProtectedRoute>}>
        <Route path="dashboard" element={<CmsDashboardPage />} />
        <Route path="create" element={<CreateQuizPage />} />
        <Route path="quizzes/:quizId/participants" element={<ParticipantsPage />} />
        <Route path="reports/:attemptId" element={<CmsReportPage />} />
      </Route>

      <Route path="/student" element={<StudentProtectedRoute><StudentLayout /></StudentProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="quizzes/:quizId/attempt" element={<AttemptQuizPage />} />
        <Route path="reports/:attemptId" element={<StudentReportPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
