import { Link } from 'react-router-dom';
import styles from './thankPage.module.scss';

export default function ThankPage() {
  return (
    <>
      <div className={styles.thanks_wrap}>
        <div className={styles.thanks_text}>Ваш заказ оформлен</div>
        <Link to="/" className={styles.thanks_link}>
          На главную
        </Link>
      </div>
    </>
  );
}
