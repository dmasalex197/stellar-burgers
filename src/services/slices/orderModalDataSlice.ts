import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDER_MODAL_DATA_SLICE_NAME } from './sliceNames';
import { fetchNewOrders } from '../thunk/orders';

interface OrderModalDataState {
  data: TOrder | null;
  loading: boolean;
}

const initialState: OrderModalDataState = {
  data: null,
  loading: false
};

const orderModalDataSlice = createSlice({
  name: ORDER_MODAL_DATA_SLICE_NAME,
  initialState,
  reducers: {
    clearOrderModalData(state) {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { clearOrderModalData } = orderModalDataSlice.actions;

export const orderModalDataReducer = orderModalDataSlice.reducer;
