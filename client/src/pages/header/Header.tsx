import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  isAuth: boolean;
  onLogout: () => void;
}

function Header({ isAuth, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/auth');
  };

  return (
    <header>
      <div className="header-container">
        <h1 className="header-title" onClick={() => navigate(isAuth ? "/favorites" : "/")}>
          Носочки
        </h1>
        
        <div className="header-nav">
          {isAuth ? (
            <>
                <button className="header-button" onClick={() => navigate('/socks')}>
                Носки
              </button>
              <button className="header-button" onClick={() => navigate('/svg')}>
                Сoздать носок
              </button>
              <button className="header-button" onClick={() => navigate('/favorites')}>
                Избранное
              </button>
              <button className="header-button" onClick={() => navigate(`/user/basket`)}>
                Корзина
              </button>
              <button className="header-button" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <button className="header-button auth-button" onClick={() => navigate('/auth')}>
              Войти / Регистрация
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;