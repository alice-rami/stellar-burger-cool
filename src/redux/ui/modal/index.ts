import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginThunk } from '../user/thunks/login-thunk';
import { submitOrderThunk } from '../order/thunks/submit-order-thunk';

type ModalContent =
  | 'ingredient'
  | 'burger'
  | 'order'
  | 'mobile-menu'
  | 'loader'
  | 'success'
  | 'error'
  | 'order-received';

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
    showIngredient(state) {
      state.modalContent = 'ingredient';
      state.isModalOpen = true;
    },
    showBurger(state) {
      state.modalContent = 'burger';
      state.isModalOpen = true;
    },
    showOrder(state) {
      state.modalContent = 'order';
      state.isModalOpen = true;
    },
    showReceivedOrder(state) {
      state.modalContent = 'order-received';
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
        state.modalContent = 'order';
        state.isModalOpen = true;
      })
      .addCase(submitOrderThunk.pending, (state) => {
        state.modalContent = 'loader';
        state.isModalOpen = true;
      })
      .addCase(submitOrderThunk.rejected, (state) => {
        state.message = 'Не удалось создать заказ. Попробуйте еще раз';
      })
      // .addCase(fetchIngredientsThunk.rejected, (state) => {
      //   state.message =
      //     'Не удалось получить ингредиенты с сервера. Попробуйте перезагрузить страницу';
      // })
      .addCase(loginThunk.rejected, (state, action) => {
        if (action.error.message === 'email or password are incorrect') {
          state.message =
            'Логин или пароль не найдены. Проверьте правильность введенных данных или воспользуйтесь ссылками ниже';
        }
      });
  },
});

export const modalActions = modalSlice.actions;
