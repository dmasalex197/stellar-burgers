import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getOrderByNumberThunk,
  getFeedsThunk,
  getOrdersThunk
} from '../thunk/orders';
import { ORDERS_SLICE_NAME } from './sliceNames';

interface OrdersState {
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
  request: boolean;
  orderData: TOrder | null;
  loading: boolean;
  error: string | null;
  status: 'pending' | 'done' | 'created';
}

export const initialState: OrdersState = {
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  request: false,
  orderData: null,
  loading: false,
  error: null,
  status: 'created'
};

const ordersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.success = true;
        state.loading = false;
      })
      .addCase(getFeedsThunk.rejected, (state) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.orderData = null;
        state.loading = false;
        state.error = action.error.message || 'Не удалось получить заказ';
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.orders = [];
        state.loading = false;
        state.success = false;
        state.error =
          action.error.message || 'Не удалось получить заказы пользователя';
      });
  },
  selectors: {
    selectFeedOrders: (sliceState: OrdersState) => sliceState.orders
  }
});

export const { selectFeedOrders } = ordersSlice.selectors;

export const ordersReducer = ordersSlice.reducer;
