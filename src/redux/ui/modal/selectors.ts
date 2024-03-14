import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

export const selectModalModule = (store: RootState) => store.modal;
export const selectModalMessage = (store: RootState) =>
  selectModalModule(store).message;

export const selectModalContent = createSelector(
  [selectModalModule],
  ({ modalContent }) => {
    return {
      isError: modalContent === 'error',
      isMobileMenu: modalContent === 'mobile-menu',
      isOrderConfirmation: modalContent === 'order-confirmation',
      isBurger: modalContent === 'burger',
      isLoader: modalContent === 'loader',
      isSuccess: modalContent === 'success',
    };
  }
);
