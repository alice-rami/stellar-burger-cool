import classNames from 'classnames';
import { orderStatusConfig } from '../config';
import { OrderIngredientCard } from '../order-ingr-card/component';
import { Order, OrderIngredientDetails } from '../types';
import styles from './styles.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  digitsDefault,
  inactive,
  textDefault,
  textM,
} from '../../../utils/constants-kit-styles';

interface OrderDetailsProps {
  order: Order;
  uniqueIngredientsData: OrderIngredientDetails[];
  orderTotal: number;
}

export const OrderDetails = ({
  order,
  uniqueIngredientsData,
  orderTotal,
}: OrderDetailsProps) => {
  const { number, name, createdAt, status } = order;

  return (
    <div className={styles.container}>
      <div className={classNames(digitsDefault, 'mb-10', styles.centered)}>
        #{number}
      </div>
      <h2 className={classNames(textM, 'mb-3')}>{name}</h2>
      <p
        className={classNames(
          textDefault,
          'mb-15',
          orderStatusConfig[status].textColor
        )}
      >
        {orderStatusConfig[status].textStatus}
      </p>
      <h3 className={classNames(textM, 'mb-6')}>Состав:</h3>
      <div
        className={classNames(
          'custom-scroll mb-10',
          styles.ingredientsContainer
        )}
      >
        {uniqueIngredientsData &&
          uniqueIngredientsData.map((ingredient, index) => (
            <OrderIngredientCard ingredient={ingredient} key={index} />
          ))}
      </div>
      <footer className={`mb-10 ${styles.dateAndOrderPrice}`}>
        {(
          <FormattedDate
            className={classNames(textDefault, inactive)}
            date={new Date(createdAt)}
          />
        ) || ''}
        <div className={styles.orderPrice}>
          <p className={digitsDefault}>{orderTotal || 0}</p>
          <CurrencyIcon type='primary' />
        </div>
      </footer>
    </div>
  );
};
