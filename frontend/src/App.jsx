import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Problems from './pages/Problems';
import ProblemDetail from './pages/ProblemDetail';
import Topics from './pages/Topics';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes (fullscreen, no sidebar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main layout shell for standard pages */}
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/topics" element={<Topics />} />
            
            {/* Protected routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Redirect any unhandled routes to home dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
