import { createSlice } from '@reduxjs/toolkit';
import { submitOrderThunk } from './thunks/submit-order-thunk';

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
  reducers: {},
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
