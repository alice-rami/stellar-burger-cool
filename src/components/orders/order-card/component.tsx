import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import {
  digitsDefault,
  digitsM,
  inactive,
  textDefault,
  textM,
} from '../../../utils/constants-kit-styles';
import classNames from 'classnames';
import { useScreenSize } from '../../../device-context/hook';
import { Order, OrderIngredientDetails } from '../types';
import { orderStatusConfig } from '../config';
import { OrderIngredientImages } from '../order-ingr-images/component';

interface OrderCardProps {
  order: Order;
  firstIngredients: OrderIngredientDetails[];
  extra: number;
  orderTotal: number;
  showOrderDetails: () => void;
}

export const OrderCard = ({
  order,
  firstIngredients,
  extra,
  orderTotal,
  showOrderDetails,
}: OrderCardProps) => {
  const { isMobile } = useScreenSize();
  const { number, createdAt, name, status } = order;

  return (
    <div className={styles.container} onClick={showOrderDetails}>
      <div className={styles.numAndDate}>
        <p className={textDefault}>#{number}</p>
        <FormattedDate
          className={classNames(textDefault, inactive)}
          date={new Date(createdAt)}
        />
      </div>
      <h2 className={classNames(textM, styles.name)}>{name}</h2>
      <p
        className={classNames(textDefault, orderStatusConfig[status].textColor)}
      >
        {orderStatusConfig[status].textStatus}
      </p>
      <div className={styles.ingrAndPrice}>
        <OrderIngredientImages
          firstIngredientsData={firstIngredients}
          extra={extra}
        />
        <span
          className={classNames(isMobile ? '' : 'mr-10', styles.priceContainer)}
        >
          <p className={classNames('mr-2', isMobile ? digitsDefault : digitsM)}>
            {orderTotal ? orderTotal : 0}
          </p>
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </div>
  );
};
