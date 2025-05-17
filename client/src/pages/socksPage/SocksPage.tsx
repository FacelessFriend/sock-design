import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsersSocks } from '../../services/api/socksApi/socksApi';
import { addFavorite, deleteFavorite } from '../../services/api/favoriteApi/favoriteApi';
import { createBasket } from '../../services/api/basketApi/basketApi';
import SvgComponent from '../../components/SvgComponent/SvgComponent';
import { FaHeart, FaRegHeart, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import styles from './SocksPage.module.scss';

interface SockWithFavorite {
  id: number;
  Color?: {
    code: string;
  };
  Pattern?: {
    pattern_url: string;
  };
  Picture?: {
    picture_url: string;
  };
  isFavorite: boolean;
  inCart: boolean;
  SockFavorites?: Array<{
    id: number;
    user_id: number;
    sock_id: number;
  }>;
}

interface AllSocksPageProps {
  isAuth: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
}

export default function AllSocksPage({ isAuth, user }: AllSocksPageProps) {
  const [socks, setSocks] = useState<SockWithFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth || !user) {
      setLoading(false);
      return;
    }
  
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const socksData = await getUsersSocks(user.id);
        
        if (!socksData) {
          throw new Error('Не удалось загрузить данные о носках');
        }
  
        const socksWithFavorites = socksData.map(sock => ({
          ...sock,
          isFavorite: sock.SockFavorites ? sock.SockFavorites.some(fav => fav.user_id === user.id) : false,
          inCart: false
        }));
  
        setSocks(socksWithFavorites);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [isAuth, user]);

  const handleFavoriteClick = async (sockId: number, isCurrentlyFavorite: boolean) => {
    if (!isAuth || !user) {
      setError('Для добавления в избранное необходимо авторизоваться');
      return;
    }

    try {
      if (isCurrentlyFavorite) {
        const sock = socks.find(s => s.id === sockId);
        const favoriteId = sock?.SockFavorites?.find(fav => fav.user_id === user.id)?.id;
        
        if (favoriteId) {
          await deleteFavorite(favoriteId);
          setSocks(prevSocks => 
            prevSocks.map(sock => 
              sock.id === sockId 
                ? { 
                    ...sock, 
                    isFavorite: false,
                    SockFavorites: sock.SockFavorites?.filter(fav => fav.id !== favoriteId)
                  } 
                : sock
            )
          );
        }
      } else {
        const newFavorite = await addFavorite({ user_id: user.id, sock_id: sockId });
        setSocks(prevSocks => 
          prevSocks.map(sock => 
            sock.id === sockId 
              ? { 
                  ...sock, 
                  isFavorite: true,
                  SockFavorites: [
                    ...(sock.SockFavorites || []),
                    { id: newFavorite.id, user_id: user.id, sock_id: sockId }
                  ]
                } 
              : sock
          )
        );
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
      setError('Ошибка при обновлении избранного');
    }
  };

  const handleAddToCart = async (sockId: number) => {
    if (!isAuth || !user) {
      setError('Для добавления в корзину необходимо авторизоваться');
      return;
    }
  
    try {
      const response = await createBasket({
        sockId: sockId,
        quantity: 1,
        status: 'active',
        user_id: user.id
      });
  
      if (response) {
        setSocks(prevSocks => 
          prevSocks.map(sock => 
            sock.id === sockId 
              ? { ...sock, inCart: true } 
              : sock
          )
        );
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(`Ошибка при добавлении в корзину: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDetailsClick = (sockId: number) => {
    navigate(`/socks/${sockId}`);
  };

  if (loading) return <div className={styles.loading}>Загрузка коллекции...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!isAuth) return <div className={styles.error}>Авторизуйтесь для просмотра коллекции</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Коллекция носков</h1>
      
      {socks.length === 0 ? (
        <div className={styles.empty}>Ваша коллекция носков пуста</div>
      ) : (
        <div className={styles.socksGrid}>
          {socks.map(sock => (
            <div key={sock.id} className={styles.sockCard}>
              <div className={styles.sockImageContainer}>
                <SvgComponent 
                  color={sock.Color?.code || '#ffffff'} 
                  pattern={sock.Pattern?.pattern_url} 
                  picture={sock.Picture?.picture_url} 
                  isPreview={true}
                  width={100}
                  height={100}
                />
              </div>
              
              <div className={styles.sockInfo}>
                <span className={styles.sockId}>Носок #{sock.id}</span>
                
                <div className={styles.sockActions}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(sock.id, sock.isFavorite);
                    }}
                    className={styles.actionButton}
                  >
                    {sock.isFavorite ? (
                      <FaHeart color="red" className={styles.icon} />
                    ) : (
                      <FaRegHeart className={styles.icon} />
                    )}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(sock.id);
                    }}
                    disabled={sock.inCart}
                    className={styles.actionButton}
                  >
                    <FaShoppingCart 
                      color={sock.inCart ? 'green' : 'gray'} 
                      className={styles.icon}
                    />
                  </button>

                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}