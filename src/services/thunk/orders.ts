import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearConstructor } from '../slices/constructorItemsSlice';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getFeedsApi()
);

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (orderNumber: number) => await getOrderByNumberApi(orderNumber)
);

export const fetchProfileOrders = createAsyncThunk(
  'orders/fetchProfileOrders',
  async () => await getOrdersApi()
);

export const fetchNewOrders = createAsyncThunk(
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
