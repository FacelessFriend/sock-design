import { useEffect, useState } from 'react';
import styles from './miniSock.module.scss';
import type { Sock } from '../../services/api/socksApi/types';
import { getSockById } from '../../services/api/socksApi/socksApi';

interface MiniSockProps {
  sockId: number;
}

export default function MiniSock(props: MiniSockProps) {
  const { sockId } = props;

  const [sock, setSock] = useState<Sock | null>(null);

  async function getSock(sockId: number): Promise<void> {
    const response = await getSockById(sockId);
    if (response) {
      setSock(response);
    }
  }

  useEffect(() => {
    getSock(sockId);
  }, [sockId]);

  return (
    <div className={styles.sock_wrap}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width="80%"
        height="80%"
        viewBox="0 0 512 512"
        stroke="#6b7b84"
        strokeWidth="2"
        className={styles.sock}
      >
        <path
          d="M444.368 319.916c-11.69-19.637-28.937-36.436-50.694-47.679l-90.071-46.594V0H49.666v302.921c.019 47.426 26.52 90.958 68.641 112.771l158.703 82.096C295.601 507.406 315.612 512 335.258 512a127.453 127.453 0 0 0 65.167-17.966c19.646-11.69 36.444-28.928 47.687-50.693 9.628-18.592 14.221-38.602 14.221-58.248a127.4 127.4 0 0 0-17.965-65.177z"
          fill={sock?.Color?.code || '#e3ede8'}
        />
      </svg>

      <div className={styles.pattern_wrap}>
        <img
          src="/images/patterns/pat_winter_blue.svg"
          alt="pat_winter_blue"
          className={`${styles.pattern} ${
            sock?.Pattern?.pattern_url === 'pat_winter_blue.svg'
              ? styles.pictureVisible
              : ''
          }`}
        />
        <img
          src="/images/patterns/pat_pink.svg"
          alt="pat_pink"
          className={`${styles.pattern} ${
            sock?.Pattern?.pattern_url === 'pat_pink.svg'
              ? styles.pictureVisible
              : ''
          }`}
        />
      </div>
      <div className={styles.picture_wrap}>
        <img
          src="/images/pictures/pic_winter_blue.svg"
          alt=""
          className={`${styles.picture} ${
            sock?.Picture?.picture_url === 'pic_winter_blue.svg'
              ? styles.pictureVisible
              : ''
          }`}
        />
        <img
          src="/images/pictures/pic_paw.svg"
          alt=""
          className={`${styles.picture} ${
            sock?.Picture?.picture_url === 'pic_paw.svg'
              ? styles.pictureVisible
              : ''
          }`}
        />
        <img
          src="/images/pictures/pic_heart_orange.svg"
          alt=""
          className={`${styles.picture} ${
            sock?.Picture?.picture_url === 'pic_heart_orange.svg'
              ? styles.pictureVisible
              : ''
          }`}
        />
      </div>
    </div>
  );
}
