import { useEffect, useMemo, useState, type ReactEventHandler } from 'react';
import styles from './basketPage.module.scss';
import type { Basket } from '../../services/api/basketApi/types';
import {
  deleteBasket,
  getUsersBaskets,
  updateBasket,
} from '../../services/api/basketApi/basketApi';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import MiniSock from '../../components/miniSock/miniSock';

interface BasketPageProrps {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function BasketPage({ user }: BasketPageProrps) {
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [inputsCount, setInputsCount] = useState<
    { id: number; quantity: number }[]
  >([]);

  const id: number = user.id;

  const navigate = useNavigate();

  useEffect(() => {
    getUsersBaskets(id).then((response) => {
      setBaskets(response);
      setInputsCount(
        response?.map((basket) => {
          return { id: basket.id, quantity: basket.quantity };
        })
      );
    });
  }, []);

  // useEffect(() => {
  //   console.log('inputsCount', inputsCount);
  // }, [inputsCount]);

  function getWord(num: number): string {
    if (num === 1) {
      return 'товар';
    }
    if (num >= 5 || num === 0) {
      return 'товаров';
    }
    return 'товара';
  }

  async function onDeleteItemHandler(sockId: number): Promise<void> {
    const response = await deleteBasket(sockId);
    console.log(response);

    if (response > 0) {
      setBaskets((prev) => prev.filter((basket) => basket.id !== sockId));
    }
  }

  function getCountItems(id: number): number {
    const countItem = inputsCount.find((item) => item.id === id);
    return countItem?.quantity ?? 1;
  }

  const sumItems = useMemo(() => {
    return baskets.reduce((sum, basket) => {
      const countItem = inputsCount.find((item) => item.id === basket.id);
      return sum + (countItem?.quantity ?? 1);
    }, 0);
  }, [inputsCount, baskets]);

  async function onSendOrderHandler(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const order = baskets.map((basket, index) => {
      return `${index + 1}. Socks:
      art: ${basket.socks_id},
      color: ${basket.Sock.color_id} || '',
      pattern: ${basket.Sock.pattern_id} || '',
      picture: ${basket.Sock.picture_id} || '',
      count: ${getCountItems(basket.id)}`;
    }, []);

    const orderInfo = order.join('\n');
    console.log(orderInfo);

    for (const basket of baskets) {
      const count = getCountItems(basket.id);
      const basketData = {
        sockId: basket.socks_id,
        quantity: count,
        status: 'send',
      };
      await updateBasket(basket.id, basketData);
    }

    //отправить на мыло

    navigate('/thanks');
  }

  function onChangeInputHandler(basketId: number, value: number): void {
    setInputsCount((prev) =>
      prev.map((countObj) =>
        countObj.id === basketId ? { ...countObj, quantity: value } : countObj
      )
    );
  }

  return (
    <>
      <div className={styles.page_wrap}>
        <h2>Корзина</h2>
        <div className={styles.quantity}>
          {sumItems} {getWord(sumItems)}{' '}
        </div>
        <form className={styles.baskets_wrap} onSubmit={onSendOrderHandler}>
          {baskets?.map((basket) => {
            return (
              <div key={basket.id} className={styles.basket_wrap}>
                <div className={styles.sock_wrap}>
                  <MiniSock sockId={basket.Sock.id} />
                </div>

                <div className={styles.info_wrap}>
                  <div className={styles.info_text}>
                    <h4>
                      Socks, color: {basket.Sock.Color.color}, pattern:{' '}
                      {basket.Sock.Pattern?.pattern || 'нет'}, picture:{' '}
                      {basket.Sock.Picture?.picture || 'нет'}
                    </h4>
                    <Link
                      to={`/socks/${basket.socks_id}`}
                      className={styles.info_link}
                    >
                      Подробнее о товаре
                    </Link>

                    <button
                      type="button"
                      className={styles.del_button}
                      onClick={() => onDeleteItemHandler(basket.id)}
                    >
                      <DeleteOutline />
                      Удалить
                    </button>
                  </div>
                  <div className={styles.info_input_wrap}>
                    <label htmlFor="num" className={styles.info_input_label}>
                      Кол-во
                    </label>
                    <input
                      id="num"
                      type="number"
                      min="1"
                      max="10"
                      className={styles.info_input}
                      value={getCountItems(basket.id)}
                      onChange={(e) =>
                        onChangeInputHandler(basket.id, Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {sumItems ? (
            <button type="submit" className={styles.form_button}>
              Оформить заказ
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
}
