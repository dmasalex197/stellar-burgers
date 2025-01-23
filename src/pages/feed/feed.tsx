import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedsThunk } from '../../services/thunk/orders';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  // Функция для повторной загрузки данных
  const handleGetFeeds = useCallback(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  // Мемоизация orders
  const memoizedOrders = useMemo(() => orders, [orders]);

  // Отображение прелоадера при загрузке
  if (loading) {
    return <Preloader />;
  }

  // Отображение ошибки
  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  // Отображение компонента FeedUI
  return <FeedUI orders={memoizedOrders} handleGetFeeds={handleGetFeeds} />;
};
