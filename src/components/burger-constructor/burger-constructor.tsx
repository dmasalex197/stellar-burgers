import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearOrderModalData } from '../../services/slices/orderModalDataSlice';
import { useNavigate } from 'react-router-dom';
import { orderBurgerThunk } from '../../services/thunk/orders';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.constructorItems);
  const orderRequest = useSelector((state) => state.orderModalData.loading);
  const orderModalData = useSelector((state) => state.orderModalData.data);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    // if (!isAuthenticated) {
    if (!localStorage.getItem('refreshToken')) {
      navigate('/login');
      return;
    }
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(orderBurgerThunk(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      data-cy='constructor'
    />
  );
};
