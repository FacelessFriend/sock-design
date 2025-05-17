import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSockById } from '../../services/api/socksApi/socksApi';
import { getFavorites, addFavorite, deleteFavorite } from '../../services/api/favoriteApi/favoriteApi';
import { createBasket } from '../../services/api/basketApi/basketApi';
import SvgComponent from '../../components/svgComponent/svgComponent';

export default function SockDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [sock, setSock] = useState<Sock | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId] = useState(1); // Replace with actual user ID from auth
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        
        const sockId = parseInt(id);
        const [sockData, favoritesData] = await Promise.all([
          getSockById(sockId),
          getFavorites(userId)
        ]);

        if (sockData) {
          setSock(sockData);
          setIsFavorite(favoritesData.some(fav => fav.sock_id === sockId));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, userId]);

  const handleFavoriteClick = async () => {
    if (!sock) return;
    
    try {
      if (isFavorite) {
        await deleteFavorite(sock.id);
      } else {
        await addFavorite({ user_id: userId, sock_id: sock.id });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleAddToBasket = async () => {
    if (!sock) return;
    
    try {
      await createBasket({
        sockId: sock.id,
        quantity: 1,
        status: 'active'
      });
      alert('Sock added to basket!');
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!sock) return <div>Sock not found</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Back to All Socks
      </button>
      
      <div className={styles.sockDetail}>
        <div className={styles.sockDisplay}>
          <SvgComponent 
            color={sock.Color} 
            pattern={sock.Pattern} 
            picture={sock.Picture} 
            isPreview={false}
          />
        </div>
        
        <div className={styles.sockInfo}>
          <h2>Sock Details</h2>
          <p>Color: {sock.Color.color}</p>
          {sock.Pattern && <p>Pattern: {sock.Pattern.pattern}</p>}
          {sock.Picture && <p>Picture: {sock.Picture.picture}</p>}
          
          <div className={styles.actions}>
            <button
              onClick={handleFavoriteClick}
              className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '♡ Add to Favorites'}
            </button>
            
            <button 
              onClick={handleAddToBasket}
              className={styles.basketButton}
            >
              🛒 Add to Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}