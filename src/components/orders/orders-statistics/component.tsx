import classNames from 'classnames';
import styles from './styles.module.css';
import {
  digitsDefault,
  digitsL,
  success,
  textM,
} from '../../../utils/constants-kit-styles';

interface OrderStatisticsProps {
  doneOrders: number[];
  pendingOrders: number[];
  total: number | null;
  totalToday: number | null;
}

export const OrdersStatistics = ({
  doneOrders,
  pendingOrders,
  total,
  totalToday,
}: OrderStatisticsProps) => {
  return (
    <div className={styles.container}>
      <section className={styles.statusContainer}>
        <div>
          <h2 className={classNames(textM, 'mb-6')}>Готовы:</h2>
          <div className={styles.doneContainer}>
            {doneOrders.slice(0, 24).map((orderNumber) => (
              <p
                key={`done-${orderNumber}`}
                className={classNames(digitsDefault, success)}
              >
                {orderNumber}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2 className={classNames(textM, 'mb-6')}>В работе:</h2>
          <div className={styles.pendingContainer}>
            {pendingOrders.slice(0, 21).map((orderNumber) => (
              <p key={`pending-${orderNumber}`} className={digitsDefault}>
                {orderNumber}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h2 className={textM}>Выполнено за всё время:</h2>
        <p className={digitsL}>{total}</p>
      </section>
      <section>
        <h2 className={textM}>Выполнено за сегодня:</h2>
        <p className={digitsL}>{totalToday}</p>
      </section>
    </div>
  );
};
