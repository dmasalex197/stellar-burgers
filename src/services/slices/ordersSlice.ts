import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrders } from '../thunk/orders';

interface OrdersState {
  orders: TOrder[];
  orderData: TOrder | null;
  request: boolean;
}

const initialState: OrdersState = {
  orders: [],
  orderData: null,
  request: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<TOrder[]>) {
      state.orders = action.payload;
    },
    addOrder(state, action: PayloadAction<TOrder>) {
      state.orders.push(action.payload);
    },
    setOrderData(state, action: PayloadAction<TOrder | null>) {
      state.orderData = action.payload;
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.request = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.request = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.request = false;
        state.orders = action.payload || [];
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.request = false;
      });
  }
});

export const { setOrders, addOrder, setOrderData, setOrderRequest } =
  ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
