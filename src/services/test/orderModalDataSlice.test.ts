import { TOrder } from '@utils-types';
import { jest } from '@jest/globals';
import { orderBurgerThunk } from '../thunk/orders';
import {
  clearOrderModalData,
  initialState,
  orderModalDataReducer,
  OrderModalDataState
} from '../slices/orderModalDataSlice';

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

const testOrder: TOrder = {
  _id: '123',
  ingredients: [],
  status: 'done',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01',
  number: 123,
  name: 'Order1'
};

describe('orderModalDataSlice', () => {
  it('loading true при fetchNewOrders.pending', () => {
    const action = { type: orderBurgerThunk.pending.type };
    const state = orderModalDataReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('data и loading false при fetchNewOrders.fulfilled', () => {
    const action = {
      type: orderBurgerThunk.fulfilled.type,
      payload: testOrder
    };
    const state = orderModalDataReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(testOrder);
  });

  it('loading в false при fetchNewOrders.rejected', () => {
    const action = { type: orderBurgerThunk.rejected.type };
    const state = orderModalDataReducer(initialState, action);
    expect(state.loading).toBe(false);
  });

  it('сброс data при clearOrderModalData', () => {
    const modifiedState: OrderModalDataState = {
      data: testOrder,
      loading: false
    };
    const action = clearOrderModalData();
    const state = orderModalDataReducer(modifiedState, action);

    expect(state.data).toBeNull();
  });
});
