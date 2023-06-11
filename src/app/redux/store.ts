import { configureStore } from '@reduxjs/toolkit';
import banksSlice from './banksSlice';
import { saveHistoryMiddleware } from './middlewares/saveHistoryMiddleware';
import { saveFavoriteMiddleware } from './middlewares/saveFavoriteMiddleware';
import { apiSlice } from './apiSlice';

const store = configureStore({
  reducer: {
    banks: banksSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      saveHistoryMiddleware,
      saveFavoriteMiddleware,
      apiSlice.middleware
    ),
});

export default store;

export type AppDispatch = typeof store.dispatch;
