import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

export const selectUserModule = (store: RootState) => store.user;

export const selectIsAuthorized = createSelector(
  [selectUserModule],
  ({ user, isAuthChecked }) => {
    return user && isAuthChecked;
  }
);
