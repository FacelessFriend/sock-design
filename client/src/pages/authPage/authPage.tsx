import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  { authApi } from '../../services/api/userApi/userApi';
import type { AuthFormData } from '../../services/api/userApi/types'; 

const initialFormData: AuthFormData = {
  name: "",
  email: "",
  password: "",
};

function AuthPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [isRegistration, setIsRegistration] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = isRegistration
        ? await authApi.register(formData)
        : await authApi.login({
            email: formData.email,
            password: formData.password,
          });

      localStorage.setItem('accessToken', data.accessToken);
      onLoginSuccess();
      navigate('/favorites');
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка авторизации");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegistration ? "Регистрация" : "Вход"}</h2>

        <form onSubmit={handleSubmit}>
          {isRegistration && (
            <div>
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

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit">
            {isRegistration ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        <button 
          type="button"
          onClick={() => setIsRegistration(!isRegistration)}
        >
          {isRegistration ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;