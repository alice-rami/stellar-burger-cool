import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderStatus } from '../../../../components/orders/types';
import { request } from '../../../../utils/api';

export interface OrderOwnerData {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmittedOrderData {
  ingredients: string[];
  _id: string;
  owner: OrderOwnerData;
  status: OrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

interface SubmitOrderResponse {
  success: boolean;
  name: string;
  order: SubmittedOrderData;
}

const submitOrder = (orderIdsArr: string[]): Promise<SubmitOrderResponse> => {
  return request('orders', {
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') as string,
    },
    method: 'POST',
    body: JSON.stringify({
      ingredients: orderIdsArr,
    }),
  });
};

export const submitOrderThunk = createAsyncThunk('order/submit', submitOrder);
