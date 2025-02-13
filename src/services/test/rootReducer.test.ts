import { ingredientsReducer } from '../slices/ingredientsSlice';
import { constructorItemsReducer } from '../slices/constructorItemsSlice';
import { orderModalDataReducer } from '../slices/orderModalDataSlice';
import { ordersReducer } from '../slices/ordersSlice';
import { authReducer } from '../slices/authSlice';
import { combineReducers } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('инициализация rootReducer', () => {
    const initialState = {
      ingredients: ingredientsReducer(undefined, { type: 'unknown' }),
      constructorItems: constructorItemsReducer(undefined, { type: 'unknown' }),
      orderModalData: orderModalDataReducer(undefined, { type: 'unknown' }),
      orders: ordersReducer(undefined, { type: 'unknown' }),
      auth: authReducer(undefined, { type: 'unknown' })
    };

    const expectedState = combineReducers({
      ingredients: ingredientsReducer,
      constructorItems: constructorItemsReducer,
      orderModalData: orderModalDataReducer,
      orders: ordersReducer,
      auth: authReducer
    })(undefined, { type: 'unknown' });

    expect(initialState).toEqual(expectedState);
  });
});
