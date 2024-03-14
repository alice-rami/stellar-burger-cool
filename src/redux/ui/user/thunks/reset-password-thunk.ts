import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../../../utils/api';

interface PasswordResetData {
  password: string;
  token: string;
}

interface ResetResponse {
  success: boolean;
  message: string;
}

const passwordReset = ({
  password,
  token,
}: PasswordResetData): Promise<ResetResponse> => {
  return request('password-reset/reset', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      password,
      token,
    }),
  });
};

export const resetPasswordThunk = createAsyncThunk(
  'password/reset',
  passwordReset
);
