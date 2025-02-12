import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDER_MODAL_DATA_SLICE_NAME } from './sliceNames';
import { orderBurgerThunk } from '../thunk/orders';

export interface OrderModalDataState {
  data: TOrder | null;
  loading: boolean;
}

export const initialState: OrderModalDataState = {
  data: null,
  loading: false
};

export const orderModalDataSlice = createSlice({
  name: ORDER_MODAL_DATA_SLICE_NAME,
  initialState,
  reducers: {
    clearOrderModalData(state) {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderBurgerThunk.rejected, (state) => {
        state.loading = false;
      });
  }
});
export const { clearOrderModalData } = orderModalDataSlice.actions;

export const orderModalDataReducer = orderModalDataSlice.reducer;
