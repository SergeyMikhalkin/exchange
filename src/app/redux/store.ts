import { configureStore } from '@reduxjs/toolkit';
import banksSlice from './banksSlice';
import { saveHistoryMiddleware } from './saveHistoryMiddleware';

const store = configureStore({
  reducer: {
    banks: banksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveHistoryMiddleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
