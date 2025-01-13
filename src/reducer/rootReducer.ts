import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../services/slices/ingredientsSlice';
import { constructorItemsReducer } from '../services/slices/constructorItemsSlice';
import { orderModalDataReducer } from '../services/slices/orderModalDataSlice';
import { ordersReducer } from '../services/slices/ordersSlice';
import { authReducer } from '../services/slices/authSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  orderModalData: orderModalDataReducer,
  orders: ordersReducer,
  auth: authReducer
});
