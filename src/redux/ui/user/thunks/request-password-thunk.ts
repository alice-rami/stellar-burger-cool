import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../../../utils/api';

interface RequestResetResponse {
  success: boolean;
  message: string;
}

const requestPasswordReset = (
  userEmail: string
): Promise<RequestResetResponse> => {
  return request('password-reset', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email: userEmail,
    }),
  });
};

export const requestPasswordThunk = createAsyncThunk(
  'password/request',
  requestPasswordReset
);
