import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    return await getOrdersApi();
  } catch (error) {
    throw error;
  }
});
