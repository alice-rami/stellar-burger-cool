import { OrdersStatisticsContainer } from '../../components/orders/orders-statistics/container';
import { AllOrdersContainer } from '../../components/orders/orders/container-all';
import { LayoutTwoColumns } from '../../components/ui/layout-two-columns/component';

export const FeedPage = () => {
  return (
    <LayoutTwoColumns title='Лента заказов'>
      <AllOrdersContainer />
      <OrdersStatisticsContainer />
    </LayoutTwoColumns>
  );
};
