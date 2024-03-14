import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import classNames from 'classnames';
import { digitsDefault, digitsM } from '../../../utils/constants-kit-styles';

interface BurgerFooterProps {
  isMobile: boolean;
  isDesktop: boolean;
  orderTotal: number;
  isDisabled: boolean;
  handleSubmit: () => void;
}

export const BurgerFooter = ({
  isMobile,
  isDesktop,
  orderTotal,
  isDisabled,
  handleSubmit,
}: BurgerFooterProps) => {
  return (
    <section
      className={classNames(
        styles.container,
        isDesktop ? 'pt-10 pb-10 pr-4 mb-3' : 'pt-4 pb-4'
      )}
    >
      <span className={classNames(styles.priceContainer, 'mr-10')}>
        <p className={classNames('mr-2', isMobile ? digitsDefault : digitsM)}>
          {orderTotal}
        </p>
        <CurrencyIcon type='primary' />
      </span>
      <Button
        htmlType='submit'
        type='primary'
        size={isMobile ? 'medium' : 'large'}
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        {isMobile ? 'Заказать' : 'Оформить заказ'}
      </Button>
    </section>
  );
};
