import { useState, useEffect } from "react";
import FavoritesPage from "./pages/favoritePage/favoritePage";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/authPage/authPage";
import BasketPage from "./pages/basketPage/basketPage";
import ThankPage from "./pages/thankPage/thankPage";
import SvgComponent from "./components/svgComponent/svgComponent";
import Header from "./pages/header/Header";
import AllSocksPage from "./pages/socksPage/SocksPage";
import MiniSock from "./components/miniSock/miniSock";
import SockDetailPage from "./pages/socksPage/SockDetailPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  //УДАЛИТЬ ПОТОМ тестовый проп для отлатки мини-носка
  const sockId = 15;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          setIsAuth(true);
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error("Auth check error:", e);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (authData: { accessToken: string; user: any }) => {
    localStorage.setItem("accessToken", authData.accessToken);
    localStorage.setItem("user", JSON.stringify(authData.user));
    setIsAuth(true);
    setUser(authData.user);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsAuth(false);
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header isAuth={isAuth} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/socks"
          element={
            isAuth ? (
              <AllSocksPage isAuth={isAuth} user={user} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/socks/:id"
          element={
            isAuth ? (
              <SockDetailPage user={user} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/auth"
          element={
            isAuth ? (
              <Navigate to="/favorites" replace />
            ) : (
              <AuthPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/favorites"
          element={
            isAuth ? (
              <FavoritesPage user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route
          path="user/basket"
          element={user && <BasketPage user={user} />}
        />
        <Route path="/thanks" element={<ThankPage />} />
        <Route path="/svg" element={<SvgComponent />} />
        <Route path="/mini" element={<MiniSock sockId={sockId} />} />
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/socks" : "/auth"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
