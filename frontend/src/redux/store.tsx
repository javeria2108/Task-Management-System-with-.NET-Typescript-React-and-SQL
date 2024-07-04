import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import userReducer from './slices/UserSlice';
import { apiSlice } from './api/apiSlice';

const preloadedState = {
    auth: {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user'),
      role: localStorage.getItem('role'),
    },
  };

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
