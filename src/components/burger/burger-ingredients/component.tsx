import classNames from 'classnames';
import { BurgerBun } from '../burger-bun/component';
import { BurgerMiddlePart } from '../burger-middle-part/component';
import { useAppSelector } from '../../../hooks/rtkHooks';
import { selectBurgerModule } from '../../../redux/ui/burger/selectors';
import styles from './styles.module.css';
import { OrderFooterContainer } from '../burger-footer/container';

export const BurgerIngredients = () => {
  const { bun, midPart } = useAppSelector(selectBurgerModule);

  return (
    <div className={styles.container}>
      <div className={classNames('mr-2', styles.burger)}>
        <BurgerBun bun={bun} type='top' />
        <BurgerMiddlePart midPart={midPart} />
        <BurgerBun bun={bun} type='bottom' />
      </div>
      <OrderFooterContainer />
    </div>
  );
};
