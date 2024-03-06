import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WS_ALL_ORDERS_URL, WS_BASE_URL } from '../../utils/constants-urls';
import { Order } from '../../utils/types';

export interface AllOrdersMessage {
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
    getOrders: builder.query<AllOrdersMessage, void>({
      queryFn: () => ({ data: { orders: [] } }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        const ws = new WebSocket(WS_ALL_ORDERS_URL);
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data: AllOrdersMessage = JSON.parse(event.data);

            updateCachedData((draft) => {
              const { orders, total, totalToday } = data;
              draft.orders = orders;
              draft.total = total;
              draft.totalToday = totalToday;
            });
          };

          ws.addEventListener('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
