import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { favoriteApi } from '../../services/api/favoriteApi/favoriteApi';
import type { FavoriteItem } from '../../services/api/favoriteApi/types';

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
    return <div>Please log in to view favorites</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (favorites.length === 0) {
    return <div>No favorites yet</div>;
  }

  return (
    <div>
      <div>
        <h1>Your Favorite Socks</h1>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div>
        {favorites.map((favorite) => (
          <div key={favorite.id}>
            <div>
              <img 
                src={favorite.sock.Picture.picture_url} 
                alt={favorite.sock.Picture.picture} 
              />
              <div>
                <h3>{favorite.sock.Color.color} Socks</h3>
                <p>Pattern: {favorite.sock.Pattern.pattern}</p>
                <div style={{ 
                  width: '30px', 
                  height: '30px', 
                  backgroundColor: favorite.sock.Color.code,
                  borderRadius: '50%',
                  border: '1px solid #ddd'
                }} />
              </div>
              <button
                onClick={() => handleRemoveFavorite(favorite.id)}
                aria-label="Remove from favorites"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;