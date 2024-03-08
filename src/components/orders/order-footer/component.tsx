import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import classNames from 'classnames';
import { digitsDefault, digitsM } from '../../../utils/constants-kit-styles';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { selectIsAuthorized } from '../../../redux/ui/user/selectors';
import { useNavigate } from 'react-router-dom';
import { selectModalModule } from '../../../redux/ui/modal/selectors';
import { modalActions } from '../../../redux/ui/modal';
import { submitOrderThunk } from '../../../redux/ui/order/thunks/submit-order-thunk';
import { resetToDefault } from '../../../redux/ui/reset-action';

interface OrderFooterProps {
  isMobile: boolean;
  isDesktop: boolean;
  orderTotal: number;
  isDisabled: boolean;
  idsArray: string[];
}

type NavigateConfig = (
  to: string,
  options: { state: { from: string; modal?: boolean } }
) => void;

export const OrderFooter = ({
  isMobile,
  isDesktop,
  orderTotal,
  isDisabled,
  idsArray,
}: OrderFooterProps) => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const navigate: NavigateConfig = useNavigate();
  const { isModalOpen } = useAppSelector(selectModalModule);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (!isAuthorized) {
      if (isModalOpen) {
        navigate('/login', { state: { from: '/', modal: true } });
        dispatch(modalActions.closeModal());
      } else {
        navigate('/login', { state: { from: '/' } });
      }
    } else {
      dispatch(submitOrderThunk(idsArray))
        .unwrap()
        .then(() => {
          dispatch(resetToDefault());
        })
        .catch(console.error);
    }
  };

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

export default OrderFooter;
