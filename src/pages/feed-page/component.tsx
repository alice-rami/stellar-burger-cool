import { OrdersStatisticsContainer } from '../../components/orders/orders-statistics/container';
import { AllOrdersContainer } from '../../components/orders/orders/container-all';
import { LayoutTwoColumns } from '../../components/ui/layout-two-columns/component';
import { useScreenSize } from '../../device-context/hook';

export const FeedPage = () => {
  const { isDesktop } = useScreenSize();
  return (
    <LayoutTwoColumns title='Лента заказов'>
      <AllOrdersContainer />
      {isDesktop && <OrdersStatisticsContainer />}
    </LayoutTwoColumns>
  );
};
