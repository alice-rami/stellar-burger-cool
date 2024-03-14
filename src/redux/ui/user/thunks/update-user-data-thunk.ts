import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDataWithRefresh, request } from '../../../../utils/api';
import { userActions } from '..';

export interface UserData {
  name?: string;
  email?: string;
  password?: string;
}

export interface ResponseWithUserData {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

const updateUserData = (
  accessToken: string,
  { name, email, password }: UserData
): Promise<ResponseWithUserData> => {
  return request('auth/user', {
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken,
    },
    method: 'PATCH',
    body: JSON.stringify({ name, email, password }),
  });
};

export const updateUserDataThunk = createAsyncThunk(
  'user/updateData',
  ({ name, email, password }: UserData, { dispatch }) => {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken')?.startsWith('Bearer')
    ) {
      return fetchUserDataWithRefresh(updateUserData, {
        name,
        email,
        password,
      }).then((res) => {
        if (res) {
          dispatch(userActions.setUser(res.user));
        }
      });
    } else {
      dispatch(userActions.setUser(null));
    }
  }
);
