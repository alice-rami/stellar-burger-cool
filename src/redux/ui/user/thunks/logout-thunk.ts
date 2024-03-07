import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../../../utils/api';

interface LogoutResponse {
  success: boolean;
  message: string;
}

const logout = (): Promise<LogoutResponse> => {
  return request('auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
};

export const logoutThunk = createAsyncThunk('user/logout', logout);
