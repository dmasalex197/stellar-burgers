import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { fetchOrders } from '../../services/thunk/orders';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchOrders());
  };

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
