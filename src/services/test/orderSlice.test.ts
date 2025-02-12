import { initialState, ordersReducer } from '../slices/ordersSlice';
import { getOrderByNumberThunk, getOrdersThunk } from '../thunk/orders';

describe('ordersSlice', () => {
  it('loading в true при fetchOrders.pending', () => {
    const action = { type: getOrderByNumberThunk.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('данные заказа при fetchOrders.fulfilled', () => {
    // const testOrders = { orders: [{ id: 1 }], total: 100, totalToday: 10 };
    const testOrders = { orders: [], total: 0, totalToday: 0 };
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: testOrders
    };
    const state = ordersReducer(initialState, action);
    expect(state.orders).toEqual(testOrders.orders);
    expect(state.total).toBe(testOrders.total);
    expect(state.totalToday).toBe(testOrders.totalToday);
    expect(state.success).toBe(false);
    expect(state.loading).toBe(false);
  });

  it('error и сброс orderData при fetchOrder.rejected', () => {
    const action = {
      type: getOrderByNumberThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = ordersReducer(initialState, action);
    expect(state.orderData).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('loading true при fetchOrder.pending', () => {
    const action = { type: getOrderByNumberThunk.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('данные заказа при fetchOrder.fulfilled', () => {
    const testOrder = { orders: [{ id: '1' }] };
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: testOrder
    };
    const state = ordersReducer(initialState, action);
    expect(state.orderData).toEqual(testOrder.orders[0]);
    expect(state.loading).toBe(false);
  });

  it('error и сброс orderData fetchOrder.rejected', () => {
    const action = {
      type: getOrderByNumberThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = ordersReducer(initialState, action);
    expect(state.orderData).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('loading true при fetchProfileOrders.pending', () => {
    const action = { type: getOrdersThunk.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('данные заказов профиля при fetchProfileOrders.fulfilled', () => {
    const testOrders = [{ id: '1' }];
    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: testOrders
    };
    const state = ordersReducer(initialState, action);
    expect(state.orders).toEqual(testOrders);
    expect(state.loading).toBe(false);
    expect(state.success).toBe(true);
  });

  it('error и сброс заказов профиля при fetchProfileOrders.rejected', () => {
    const action = {
      type: getOrdersThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = ordersReducer(initialState, action);
    expect(state.orders).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.error).toBe('Error');
  });
});
