import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { RootState } from '../../services/store';
import { useSelector } from 'react-redux';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );

  return <ProfileOrdersUI orders={orders} />;
};
