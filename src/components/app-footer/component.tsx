import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import styles from './styles.module.css';
import { modalActions } from '../../redux/ui/modal';
import classNames from 'classnames';
import { digitsDefault } from '../../utils/constants-kit-styles';
import {
  selectModalContent,
  selectModalModule,
} from '../../redux/ui/modal/selectors';
import { Modal } from '../ui/modal/component';
import { BurgerDetails } from '../burger/burger-details/component';
import { BurgerIngredients } from '../burger/burger-ingredients/component';

interface AppFooterProps {
  orderTotal: number;
}

export const AppFooter = ({ orderTotal }: AppFooterProps) => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectModalModule);
  const { isBurger } = useAppSelector(selectModalContent);

  return (
    <>
      <section className={classNames('pt-4 pb-4 pl-2 pr-2', styles.container)}>
        <span className={styles.priceContainer}>
          <p className={digitsDefault}>{orderTotal}</p>
          <CurrencyIcon type='primary' />
        </span>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={() => {
            dispatch(modalActions.showBurger());
          }}
          disabled={orderTotal === 0}
        >
          Смотреть заказ
        </Button>
      </section>
      {isModalOpen && isBurger && (
        <Modal
          onClose={() => {
            dispatch(modalActions.closeModal());
          }}
        >
          <BurgerIngredients />
        </Modal>
      )}
    </>
  );
};
