import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseWithUserData } from './update-user-data-thunk';
import { fetchUserDataWithRefresh, request } from '../../../../utils/api';
import { userActions } from '..';

const getUser = (accessToken: string): Promise<ResponseWithUserData> => {
  return request('auth/user', {
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken,
    },
  });
};

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkAuth',
  (_, { dispatch }) => {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken')?.startsWith('Bearer')
    ) {
      return fetchUserDataWithRefresh(getUser).then((res) => {
        if (res) {
          dispatch(userActions.setUser(res.user));
        }
      });
    } else {
      dispatch(userActions.setUser(null));
    }
  }
);
