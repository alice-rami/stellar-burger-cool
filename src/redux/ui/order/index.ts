import { createSlice } from '@reduxjs/toolkit';
import {
  SubmittedOrderData,
  submitOrderThunk,
} from './thunks/submit-order-thunk';
import { PayloadAction } from '@reduxjs/toolkit';

export type RequestStatuses = 'ok' | 'loading' | 'error';

interface OrderState {
  orderNumber: number | null;
  status: RequestStatuses;
}

export const initialState: OrderState = {
  orderNumber: null,
  status: 'ok',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<SubmittedOrderData>) {
      state.orderNumber = action.payload.number;
      state.status = 'ok';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrderThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOrderThunk.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number;
        state.status = 'ok';
      })
      .addCase(submitOrderThunk.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const orderActions = orderSlice.actions;
