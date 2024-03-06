import { OrdersStatisticsContainer } from '../../components/orders/orders-statistics/container';
import { OrdersContainer } from '../../components/orders/orders/container';
import { LayoutTwoColumns } from '../../components/ui/layout-two-columns/component';

export const FeedPage = () => {
  return (
    <LayoutTwoColumns title='Лента заказов'>
      <OrdersContainer />
      <OrdersStatisticsContainer />
    </LayoutTwoColumns>
  );
};
