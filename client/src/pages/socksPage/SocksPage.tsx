import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsersSocks } from '../../services/api/socksApi/socksApi';
import { getFavorites, addFavorite, deleteFavorite } from '../../services/api/favoriteApi/favoriteApi';
import { createBasket } from '../../services/api/basketApi/basketApi';
import SvgComponent from '../../components/SvgComponent/SvgComponent';
import { FaHeart, FaRegHeart, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import styles from './SocksPage.module.scss';

interface Sock {
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
}

interface SockWithFavorite extends Sock {
  isFavorite: boolean;
  inCart: boolean;
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
        const [socksData, favoritesData] = await Promise.all([
          getUsersSocks(user.id),
          getFavorites(user.id)
        ]);

        const favoriteSockIds = favoritesData.map(fav => fav.sock_id);
        const socksWithFavorites = socksData.map(sock => ({
          ...sock,
          isFavorite: favoriteSockIds.includes(sock.id),
          inCart: false
        }));

        setSocks(socksWithFavorites);
      } catch (err) {
        setError('Не удалось загрузить коллекцию носков');
        console.error('Ошибка загрузки:', err);
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
        const favorites = await getFavorites(user.id);
        const favoriteToDelete = favorites.find(fav => fav.sock_id === sockId);
        
        if (favoriteToDelete) {
          await deleteFavorite(favoriteToDelete.id);
        }
      } else {
        await addFavorite({ user_id: user.id, sock_id: sockId });
      }
      
      setSocks(prevSocks => 
        prevSocks.map(sock => 
          sock.id === sockId 
            ? { ...sock, isFavorite: !isCurrentlyFavorite } 
            : sock
        )
      );
    } catch (err) {
      console.error('Ошибка при обновлении избранного:', err);
      setError(isCurrentlyFavorite 
        ? 'Не удалось удалить из избранного' 
        : 'Не удалось добавить в избранное');
    }
  };

  const handleAddToCart = async (sockId: number) => {
    if (!isAuth || !user) {
      setError('Для добавления в корзину необходимо авторизоваться');
      return;
    }

    try {
      await createBasket({
        socks_id: sockId,
        quantity: 1,
        status: 'active',
        user_id: user.id
      });

      setSocks(prevSocks => 
        prevSocks.map(sock => 
          sock.id === sockId 
            ? { ...sock, inCart: true } 
            : sock
        )
      );
    } catch (err) {
      console.error('Ошибка при добавлении в корзину:', err);
      setError('Не удалось добавить в корзину');
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
                    aria-label={sock.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                    title={sock.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
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
                    aria-label={sock.inCart ? "Уже в корзине" : "Добавить в корзину"}
                    title={sock.inCart ? "Уже в корзине" : "Добавить в корзину"}
                  >
                    <FaShoppingCart 
                      color={sock.inCart ? 'green' : 'gray'} 
                      className={styles.icon}
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetailsClick(sock.id);
                    }}
                    className={styles.actionButton}
                    aria-label="Подробнее"
                    title="Подробнее"
                  >
                    <FaInfoCircle className={styles.icon} />
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