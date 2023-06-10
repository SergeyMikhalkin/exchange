import { configureStore } from '@reduxjs/toolkit';
import banksSlice from './banksSlice';
import { saveHistoryMiddleware } from './saveHistoryMiddleware';
import { saveFavoriteMiddleware } from './saveFavoriteMiddleware';

const store = configureStore({
  reducer: {
    banks: banksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveHistoryMiddleware, saveFavoriteMiddleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
