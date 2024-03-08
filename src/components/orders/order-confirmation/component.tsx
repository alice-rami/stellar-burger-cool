import styles from './styles.module.css';
import image from '../../../images/done.svg';
import { useAppSelector } from '../../../hooks/rtkHooks';
import { selectOrderModule } from '../../../redux/ui/order/selectors';
import classNames from 'classnames';
import {
  digitsL,
  inactive,
  textDefault,
  textM,
} from '../../../utils/constants-kit-styles';

export const OrderConfirmation = () => {
  const { orderNumber } = useAppSelector(selectOrderModule);

  if (orderNumber === null) {
    return null;
  }

  return (
    <div className={classNames(styles.container, 'mt-30 mb-30')}>
      <h1 className={classNames(digitsL, 'mb-8')}>{orderNumber}</h1>
      <p className={textM}>идентификатор заказа</p>
      <img src={image} alt='Заказ создан' className='mt-15 mb-15' />
      <p className={classNames(textDefault, 'mb-2')}>
        Ваш заказ начали готовить
      </p>
      <p className={classNames(textDefault, inactive)}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
