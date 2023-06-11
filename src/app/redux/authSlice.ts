import { createSlice } from '@reduxjs/toolkit';

type State = {
  user: string;
};

const initialState: State = {
  user: '',
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
