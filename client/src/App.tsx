import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import AuthPage from './pages/authPage/authPage';
import { authApi } from './services/api/userApi/userApi';
import BasketPage from './pages/basketPage/basketPage';
import ThankPage from './pages/thankPage/thankPage';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessToken');
      }
    };

    checkAuth();
  }, []);

  // Функция выхода
  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      setIsAuth(false);
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <Routes>
      <Route
        path="/auth"
        element={<AuthPage onLoginSuccess={() => setIsAuth(true)} />}
      />
      <Route path="user/:id/basket" element={<BasketPage />} />
      <Route path="/thanks" element={<ThankPage />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;
