import styles from './styles.module.css';
import { Order } from '../types';
import { OrderCardContainer } from '../order-card/container';
import classNames from 'classnames';

interface OrdersProps {
  orders: Order[];
  from: string;
}

export const Orders = ({ orders, from }: OrdersProps) => {
  return (
    <div className={classNames('custom-scroll', styles.container)}>
      {orders.map((order) => (
        <OrderCardContainer key={order._id} order={order} from={from} />
      ))}
    </div>
  );
};
