import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../features/order/orderSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    auth: authReducer,
  },
});
