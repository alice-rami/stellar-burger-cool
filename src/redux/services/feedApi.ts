import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  WS_ALL_ORDERS_URL,
  WS_BASE_URL,
  WS_USER_ORDERS_URL,
} from '../../utils/constants-urls';
import { Order } from '../../components/orders/types';

export interface OrdersMessage {
  success?: boolean;
  orders: Order[];
  total?: number;
  totalToday?: number;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: WS_BASE_URL,
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersMessage, void>({
      queryFn: () => ({ data: { orders: [] } }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        const ws = new WebSocket(WS_ALL_ORDERS_URL);
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data: OrdersMessage = JSON.parse(event.data);

            updateCachedData((draft) => {
              const { orders, total, totalToday } = data;
              draft.orders = orders;
              draft.total = total;
              draft.totalToday = totalToday;
            });
          };

          ws.addEventListener('message', listener);
        } catch {
          //
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getUserOrders: builder.query<OrdersMessage, void>({
      queryFn: () => ({ data: { orders: [] } }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        const userToken = localStorage
          .getItem('accessToken')
          ?.split('Bearer ')[1];
        const ws = new WebSocket(`${WS_USER_ORDERS_URL}?token=${userToken}`);
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data: OrdersMessage = JSON.parse(event.data);

            updateCachedData((draft) => {
              const { orders, total, totalToday } = data;
              draft.orders = orders.reverse();
              draft.total = total;
              draft.totalToday = totalToday;
            });
          };

          ws.addEventListener('message', listener);
        } catch {
          //
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetOrdersQuery, useGetUserOrdersQuery } = ordersApi;
