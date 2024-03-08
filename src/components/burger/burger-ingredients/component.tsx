import classNames from 'classnames';
import { BurgerBun } from '../burger-bun/component';
import { BurgerMiddlePart } from '../burger-middle-part/component';
import { useScreenSize } from '../../../device-context/hook';
import { useAppSelector } from '../../../hooks/rtkHooks';
import OrderFooter from '../../orders/order-footer/component';
import {
  selectBurgerModule,
  selectIdsArray,
  selectIsReadyForSubmit,
  selectOrderTotal,
} from '../../../redux/ui/burger/selectors';
import styles from './styles.module.css';

export const BurgerIngredients = () => {
  const { isMobile, isDesktop } = useScreenSize();
  const { bun, midPart } = useAppSelector(selectBurgerModule);
  const orderTotal = useAppSelector(selectOrderTotal);
  const isDisabled = useAppSelector(selectIsReadyForSubmit);
  const idsArray = useAppSelector(selectIdsArray);

  return (
    <div className={styles.container}>
      <div className={classNames('mr-2', styles.burger)}>
        <BurgerBun bun={bun} type='top' />
        <BurgerMiddlePart midPart={midPart} />
        <BurgerBun bun={bun} type='bottom' />
      </div>
      <OrderFooter
        isMobile={isMobile}
        isDesktop={isDesktop}
        orderTotal={orderTotal}
        isDisabled={isDisabled}
        idsArray={idsArray}
      />
    </div>
  );
};
