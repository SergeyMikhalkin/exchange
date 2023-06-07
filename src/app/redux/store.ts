import { configureStore } from '@reduxjs/toolkit';
import banksSlice from './banksSlice';

const store = configureStore({
  reducer: {
    banks: banksSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
