import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { fetchProfileOrders } from '../../services/thunk/orders';
import { fetchIngredients } from '../../services/thunk/ingredients';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);
  return <ProfileOrdersUI orders={orders} />;
};
