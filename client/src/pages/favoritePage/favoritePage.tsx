import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa'; 
import { favoriteApi } from '../../services/api/favoriteApi/favoriteApi';
import type { FavoriteItem } from '../../services/api/favoriteApi/types';
import './favoritePage.css';
import MiniSock from '../../components/miniSock/miniSock';

interface FavoritesPageProps {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  onLogout: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ user, onLogout }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await favoriteApi.getFavorites(user.id);
      setFavorites(data);
    } catch (err) {
      setError('Failed to load favorites');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      await favoriteApi.deleteFavorite(favoriteId);
      await fetchFavorites();
    } catch (err) {
      setError('Failed to remove favorite');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user?.id]);

  if (!user) {
    return <div className="message">Please log in to view favorites</div>;
  }

  if (loading) {
    return <div className="message">Loading...</div>;
  }

  if (error) {
    return <div className="message">{error}</div>;
  }

  if (favorites.length === 0) {
    return <div className="message">No favorites yet</div>;
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Твои любимые носки</h1>
      </div>
      <div className="favorites-list">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorite-item">
            {/* <img 
              className="favorite-image"
              src={favorite.sock.Picture.picture_url} 
              alt={favorite.sock.Picture.picture} 
            /> */}
            <div className='img_wrap'>
            <MiniSock sockId={favorite.sock.id} /></div>
            <div className="favorite-details">
              <h3>{favorite.sock.Color.color} Socks</h3>
              <p>Pattern: {favorite.sock.Pattern?.pattern || '-'}</p>
              <p>Pattern: {favorite.sock.Picture?.picture || '-'}</p>
            </div>
            <p>Ссылка на носок: http://localhost:5173/socks/{favorite.sock.id}</p>
            <button
              className="favorite-remove-btn"
              onClick={() => handleRemoveFavorite(favorite.id)}
            >
              <FaHeart />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;