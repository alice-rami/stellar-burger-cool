import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseWithUserData, UserData } from './update-user-data-thunk';
import { request } from '../../../../utils/api';

type IRegisterData = Required<UserData>;

const register = ({
  email,
  password,
  name,
}: IRegisterData): Promise<ResponseWithUserData> => {
  return request('auth/register', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
};

export const registerThunk = createAsyncThunk('user/register', register);
