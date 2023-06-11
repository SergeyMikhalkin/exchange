import { createSlice } from '@reduxjs/toolkit';
import { LS_KEYS } from 'shared';

export type AuthState = {
  user: string;
};

const currentUser = localStorage[LS_KEYS.currentUser];

const initialState: AuthState = {
  user: currentUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload;
    },
  },
});

export default authSlice;

export const { setAuth } = authSlice.actions;

type RootState = {
  auth: {
    user: string;
  };
};

export const getUserAuth = (state: RootState): string => state.auth.user;
