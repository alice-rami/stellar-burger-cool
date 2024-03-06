// import ErrorBoundary from '../../error-boundary/error-boundary';

import { BurgerIngredients } from '../burger-ingredients/component';
import { textL } from '../../../utils/constants-kit-styles';
import styles from './styles.module.css';

export const IndgredientDetails = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={textL}>Заказ</h2>
      </header>
      {/* <ErrorBoundary> */}
      <BurgerIngredients />
      {/* </ErrorBoundary> */}
    </div>
  );
};
