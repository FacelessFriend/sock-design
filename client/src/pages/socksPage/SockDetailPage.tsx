import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSockById } from "../../services/api/socksApi/socksApi";
import MiniSock from "../../components/miniSock/miniSock";
import styles from "./SockDetailPage.module.scss";

interface SockDetailPageProps {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
}

interface Sock {
  id: number;
  Color?: {
    color: string;
  };
  Pattern?: {
    pattern: string;
  };
  Picture?: {
    picture: string;
  };
}

export default function SockDetailPage({ user }: SockDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const [sock, setSock] = useState<Sock | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const sockId = parseInt(id);
        const sockData = await getSockById(sockId);

        if (sockData) {
          setSock(sockData);
        }
      } catch (error) {
        console.error("Error fetching sock:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (!sock) return <div className={styles.error}>Носок не найден</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/socks')} className={styles.backButton}>
        ← Назад
      </button>

      <div className={styles.sockDisplay}>
        <MiniSock sockId={sock.id} largeSize={true} />
      </div>
    </div>
  );
}
