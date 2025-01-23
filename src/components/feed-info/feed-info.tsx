import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';

import { useSelector } from '../../services/store';
import { selectFeedOrders } from '../../services/slices/ordersSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  // const orders = useSelector((state) => state.orders);
  const orders = useSelector(selectFeedOrders);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');
  console.log('==========11111load_ingredients11111==========');
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={orders}
    />
  );
};
