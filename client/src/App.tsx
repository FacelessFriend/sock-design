import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/authPage/authPage';
import FavoritesPage from './pages/favoritePage/favoritePage';
import { authApi } from './services/api/userApi/userApi';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          // Проверяем валидность токена
          const response = await authApi.refresh();
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));
          setIsAuth(true);
          setUser(response.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (authData: AuthResponse) => {
    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('user', JSON.stringify(authData.user));
    setIsAuth(true);
    setUser(authData.user);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setIsAuth(false);
      setUser(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={isAuth ? <Navigate to="/favorites" replace /> : <AuthPage onLoginSuccess={handleLoginSuccess} />} 
      />
      <Route 
        path="/favorites" 
        element={
          isAuth ? 
            <FavoritesPage user={user} onLogout={handleLogout} /> : 
            <Navigate to="/auth" replace />
        } 
      />
      <Route 
        path="*" 
        element={<Navigate to={isAuth ? "/favorites" : "/auth"} replace />} 
      />
    </Routes>
  );
}

export default App;