import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseWithUserData, UserData } from './update-user-data-thunk';
import { request } from '../../../../utils/api';

type LoginData = Required<Pick<UserData, 'email' | 'password'>>;

const login = ({
  email,
  password,
}: LoginData): Promise<ResponseWithUserData> => {
  return request('auth/login', {
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') as string,
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const loginThunk = createAsyncThunk('user/login', login);
