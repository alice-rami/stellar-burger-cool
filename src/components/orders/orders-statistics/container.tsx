import { useGetOrdersQuery } from '../../../redux/services/feedApi';
import Loader from '../../ui/loader/component';
import { OrderStatus } from '../types';
import { OrdersStatistics } from './component';

export const OrdersStatisticsContainer = () => {
  const {
    data: ordersData,
    isFetching,
    isError,
  } = useGetOrdersQuery(undefined, {
    selectFromResult: (result) => {
      const numbersByStatus: Record<
        Extract<OrderStatus, 'done' | 'pending'>,
        number[]
      > = {
        done: [],
        pending: [],
      };
      result.data?.orders.forEach((order) => {
        if (order.status === 'done' || order.status === 'pending') {
          numbersByStatus[order.status].push(order.number);
        }
      });
      return {
        ...result,
        data: {
          doneOrders: numbersByStatus.done,
          pendingOrders: numbersByStatus.pending,
          total: result.data?.total || 0,
          totalToday: result.data?.totalToday || 0,
        },
      };
    },
  });

  if (isError) {
    console.log('Error');
  }

  if (isFetching || ordersData.doneOrders.length === 0) {
    return <Loader />;
  }

  return <OrdersStatistics {...ordersData} />;
};
