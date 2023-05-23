'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  user: {
    id: number;
    name: string;
    email: string;
    token: string;
  };
};
const ISSERVER = typeof window === 'undefined';

const localUser = !ISSERVER ? localStorage.getItem('user') : null;
const initialState = {
  user: localUser
    ? JSON.parse(localUser)
    : {
        id: 0,
        name: '',
        email: '',
        token: '',
      },
} as UserState;

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignIn: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    userSignOut: () => initialState,
  },
});

export const { userSignIn, userSignOut } = user.actions;
export default user.reducer;
