import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';

const AuthRedirect = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" replace /> : <LoginPage />;
};

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <AuthProvider>
        <TodoProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<AuthRedirect />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/create" element={<CreateTaskPage />} />
                  <Route path="/edit/:id" element={<EditTaskPage />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </TodoProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
