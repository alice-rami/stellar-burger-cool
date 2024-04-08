import { useState } from 'react';
import { OrdersStatisticsContainer } from '../../components/orders/orders-statistics/container';
import { AllOrdersContainer } from '../../components/orders/orders/container-all';
import { LayoutTwoColumns } from '../../components/ui/layout-two-columns/component';
import { TabsFeed } from '../../components/ui/tabs-feed/component';
import { useScreenSize } from '../../device-context/hook';
import styles from './styles.module.css';

export const FeedPage = () => {
  const [element, setElement] = useState('orders');
  const { isDesktop } = useScreenSize();
  return (
    <>
      {!isDesktop && (
        <div className={styles.container}>
          <TabsFeed setElement={setElement} />
          {element === 'orders' && <AllOrdersContainer />}
          {element === 'statistics' && <OrdersStatisticsContainer />}
        </div>
      )}
      {isDesktop && (
        <LayoutTwoColumns title='Лента заказов'>
          <AllOrdersContainer />
          <OrdersStatisticsContainer />
        </LayoutTwoColumns>
      )}
    </>
  );
};
