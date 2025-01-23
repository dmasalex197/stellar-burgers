import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumberThunk } from '../../services/thunk/orders';
import { TOrderInfo } from '../ui/order-info/type';

export const OrderInfo: FC = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  let orderData = useSelector((state) => {
    if (state.orders.orders?.length) {
      return state.orders.orders.find((item) => item.number === Number(number));
    }
    return null;
  });

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, orderData, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item: TIngredient & { count: number }) =>
        acc + item.price * item.count,
      0
    );

    const ingredientIds = orderData.ingredients;

    return {
      _id: orderData._id,
      status: orderData.status,
      name: orderData.name,
      createdAt: orderData.createdAt,
      updatedAt: orderData.updatedAt,
      number: orderData.number,
      ingredientsInfo,
      date,
      total,
      ingredients: ingredientIds
    } as TOrderInfo;
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
