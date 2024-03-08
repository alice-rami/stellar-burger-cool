import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

export const selectModalModule = (store: RootState) => store.modal;

export const selectModalContent = createSelector(
  [selectModalModule],
  ({ modalContent }) => {
    return {
      isError: modalContent === 'error',
      isIngredient: modalContent === 'ingredient',
      isMobileMenu: modalContent === 'mobile-menu',
      isOrder: modalContent === 'order',
      isBurger: modalContent === 'burger',
      isLoader: modalContent === 'loader',
      isSuccess: modalContent === 'success',
      isReceivedOrder: modalContent === 'order-received',
    };
  }
);
