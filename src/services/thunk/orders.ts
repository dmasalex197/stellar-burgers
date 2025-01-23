import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearConstructor } from '../slices/constructorItemsSlice';

export const getFeedsThunk = createAsyncThunk(
  'orders/fetchOrders',
  getFeedsApi
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/fetchOrder',
  getOrderByNumberApi
);

export const getOrdersThunk = createAsyncThunk(
  'orders/fetchProfileOrders',
  getOrdersApi
);

export const orderBurgerThunk = createAsyncThunk(
  'orderModalData/fetchNewOrders',
  async (ingredientIds: string[], { dispatch }) => {
    const response = await orderBurgerApi(ingredientIds);
    if (response.success) {
      dispatch(clearConstructor());
    } else {
      throw new Error('Ошибка при создании заказа');
    }
    return response.order;
  }
);
