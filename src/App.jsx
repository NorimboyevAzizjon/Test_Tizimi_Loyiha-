import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TestPage from './pages/TestPage';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';

// Admin Components
import UserManagement from './components/admin/UserManagement';
import TestCreator from './components/admin/TestCreator';
import ResultsViewer from './components/admin/ResultsViewer';
import GroupManager from './components/admin/GroupManager';

// Student Components
import TestList from './components/student/TestList';
import Results from './components/student/Results';

// 404 sahifasi uchun alohida komponent
const NotFoundPage = () => {
  const navigate = useNavigate();
  const { role } = useSelector(state => state.auth);

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    },
    content: {
      textAlign: 'center',
      padding: '40px'
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '16px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '18px',
      marginBottom: '24px'
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonHover: {
      backgroundColor: '#2563eb'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404 - Sahifa topilmadi</h1>
        <p style={styles.subtitle}>Siz qidirgan sahifa mavjud emas.</p>
        <button 
          onClick={() => navigate(role === 'admin' ? '/admin' : '/student')}
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Asosiy sahifaga qaytish
        </button>
      </div>
    </div>
  );
};

function App() {
  const { isAuthenticated, role } = useSelector(state => state.auth);

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    },
    main: {
      marginLeft: '256px',
      minHeight: '100vh',
      paddingTop: '64px'
    }
  };

  // Agar foydalanuvchi autentifikatsiyadan o'tmagan bo'lsa, login sahifasiga yo'naltirish
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <div style={{display: 'flex'}}>
          <Sidebar />
          <main style={styles.main}>
            <Routes>
              {/* Admin Routes */}
              {role === 'admin' && (
                <>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                  <Route path="/admin/tests" element={<TestCreator />} />
                  <Route path="/admin/results" element={<ResultsViewer />} />
                  <Route path="/admin/groups" element={<GroupManager />} />
                  <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
                </>
              )}

              {/* Student Routes */}
              {role === 'student' && (
                <>
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                  <Route path="/student/tests" element={<TestList />} />
                  <Route path="/student/test/:testId" element={<TestPage />} />
                  <Route path="/student/results" element={<Results />} />
                  <Route path="/student/results/:testId" element={<Results />} />
                  <Route path="/student/*" element={<Navigate to="/student" replace />} />
                </>
              )}

              {/* Common Routes */}
              <Route path="/login" element={<Navigate to={role === 'admin' ? '/admin' : '/student'} replace />} />
              
              {/* Default redirect based on role */}
              <Route path="/" element={
                role === 'admin' ? 
                <Navigate to="/admin" replace /> : 
                <Navigate to="/student" replace />
              } />
              
              {/* 404 - Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;