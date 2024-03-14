import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { submitOrderThunk } from '../order/thunks/submit-order-thunk';

type ModalContent =
  | 'burger'
  | 'order-confirmation' // after an order is created
  | 'mobile-menu'
  | 'loader'
  | 'success'
  | 'error';

interface ModalState {
  isModalOpen: boolean;
  modalContent: ModalContent | null;
  message: string | null;
}

export const initialState: ModalState = {
  isModalOpen: false,
  modalContent: null,
  message: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showBurger(state) {
      state.modalContent = 'burger';
      state.isModalOpen = true;
    },
    showOrderConfirmation(state) {
      state.modalContent = 'order-confirmation';
      state.isModalOpen = true;
    },
    showMobileMenu(state) {
      state.modalContent = 'mobile-menu';
      state.isModalOpen = true;
    },
    showLoader(state) {
      state.modalContent = 'loader';
      state.isModalOpen = true;
    },
    showMessage(state, action: PayloadAction<string>) {
      state.modalContent = 'success';
      state.isModalOpen = true;
      state.message = action.payload;
    },
    showError(state, action: PayloadAction<string>) {
      state.modalContent = 'error';
      state.isModalOpen = true;
      state.message = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalContent = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrderThunk.fulfilled, (state) => {
        state.modalContent = 'order-confirmation';
        state.isModalOpen = true;
      })
      .addCase(submitOrderThunk.pending, (state) => {
        state.modalContent = 'loader';
        state.isModalOpen = true;
      });
  },
});

export const modalActions = modalSlice.actions;
