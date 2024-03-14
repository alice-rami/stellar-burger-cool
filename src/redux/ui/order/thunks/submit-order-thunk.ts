import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderStatus } from '../../../../components/orders/types';
import { request, updateToken } from '../../../../utils/api';

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

export interface SubmitOrderResponse {
  success: boolean;
  name: string;
  order: SubmittedOrderData;
}

const submitOrder = (
  accessToken: string = localStorage.getItem('accessToken'),
  orderIdsArr: string[]
): Promise<SubmitOrderResponse> => {
  return request('orders', {
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken,
    },
    method: 'POST',
    body: JSON.stringify({
      ingredients: orderIdsArr,
    }),
  });
};

const fetchSubmitOrderWithRefresh = (
  payloadCreator: typeof submitOrder,
  params: string[] = []
) => {
  return payloadCreator(localStorage.getItem('accessToken') as string, params)
    .then((res: SubmitOrderResponse) => {
      if (res.success) {
        return res;
      } else {
        return Promise.reject('Ошибка данных с сервера');
      }
    })
    .catch((err: Error) => {
      if (err.message === 'jwt expired') {
        updateToken().then((res) => {
          if (!res.success) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return Promise.reject(res);
          }
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          return payloadCreator(res.accessToken, params);
        });
      } else {
        return Promise.reject(err);
      }
    });
};

export const submitOrderThunk = createAsyncThunk(
  'order/submit',
  (orderIdsArr: string[]) => {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken')?.startsWith('Bearer')
    ) {
      return fetchSubmitOrderWithRefresh(submitOrder, orderIdsArr);
    }
  }
);
