import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../services/api/userApi/userApi';

interface LoginSuccessData {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface AuthPageProps {
  onLoginSuccess: (data: LoginSuccessData) => void;
}

function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [isRegistration, setIsRegistration] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      let response;
      
      if (isRegistration) {
        response = await authApi.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await authApi.login({
          email: formData.email,
          password: formData.password
        });
      }

      localStorage.setItem('accessToken', response.accessToken);
      onLoginSuccess(response);
      navigate('/favorites');
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.response?.data?.message || 'Ошибка авторизации');
    }
  }

  function toggleAuthMode() {
    setIsRegistration(prev => !prev);
    setError('');
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegistration ? 'Регистрация' : 'Вход'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegistration && (
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isRegistration ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>

        <button 
          type="button" 
          className="switch-mode-btn"
          onClick={toggleAuthMode}
        >
          {isRegistration ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
