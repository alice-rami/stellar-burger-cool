import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { OrderIngredientImage } from '../order-ingr-image/component';
import {
  digitsDefault,
  textDefault,
} from '../../../utils/constants-kit-styles';
import classNames from 'classnames';
import { OrderIngredientDetails } from '../types';

interface OrderIngredientCardProps {
  ingredient: OrderIngredientDetails;
}

export const OrderIngredientCard = ({
  ingredient,
}: OrderIngredientCardProps) => {
  if (!ingredient.ingredientId) {
    return null;
  }
  const { ingredientImage, ingredientName, ingredientCount, ingredientPrice } =
    ingredient;
  return (
    <div className={styles.ingredient}>
      <div className={styles.imageAndName}>
        <OrderIngredientImage
          ingredientImage={ingredientImage || ''}
          ingredientName={ingredientName || ''}
        />
        <p className={textDefault}>{ingredientName || ''}</p>
      </div>
      <div className={styles.countAndPrice}>
        <p className={classNames(styles.ingredientPrice, digitsDefault)}>
          {ingredientCount || 0} x {ingredientPrice || 0}
        </p>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  );
};
