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

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const handleGetFeeds = useCallback(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const memoizedOrders = useMemo(() => orders, [orders]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <FeedUI orders={memoizedOrders} handleGetFeeds={handleGetFeeds} />;
};
