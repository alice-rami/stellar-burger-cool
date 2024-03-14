import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { registerThunk } from './thunks/register-thunk';
import { loginThunk } from './thunks/login-thunk';
import { checkUserAuthThunk } from './thunks/check-user-auth-thunk';
import { logoutThunk } from './thunks/logout-thunk';

export interface User {
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isAuthChecked: boolean;
}

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setIsAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        if (action.payload.success) {
          state.user = action.payload.user;
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        if (action.payload.success) {
          state.user = action.payload.user;
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      })
      .addCase(checkUserAuthThunk.fulfilled, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuthThunk.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
});

export const userActions = userSlice.actions;
