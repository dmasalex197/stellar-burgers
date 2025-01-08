import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDER_MODAL_DATA_SLICE_NAME } from './sliceNames';

interface OrderModalDataState {
  data: TOrder | null;
}

const initialState: OrderModalDataState = {
  data: null
};

const orderModalDataSlice = createSlice({
  name: ORDER_MODAL_DATA_SLICE_NAME,
  initialState,
  reducers: {
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.data = action.payload;
    }
  }
});

export const { setOrderModalData } = orderModalDataSlice.actions;

export const orderModalDataReducer = orderModalDataSlice.reducer;
