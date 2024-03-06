import classNames from 'classnames';
import { offsetConfig } from './config';
import styles from './styles.module.css';
import { textDefault } from '../../../utils/constants-kit-styles';
import { OrderIngredientDetails } from '../types';

interface OrderIngredientImagesProps {
  firstIngredientsData: OrderIngredientDetails[];
  extra: number;
  className?: string;
}

export const OrderIngredientImages = ({
  firstIngredientsData,
  extra,
  className,
}: OrderIngredientImagesProps) => {
  return (
    <span className={classNames(styles.ingrDataContainer, className)}>
      {firstIngredientsData
        ? firstIngredientsData.map((item, index) => {
            const image = item.ingredientImage;
            const name = item.ingredientName;
            return (
              <div
                className={`${styles.ingrImageContainer} ${offsetConfig[index]}`}
                key={index}
              >
                <img
                  src={image || ''}
                  alt={name || ''}
                  key={index}
                  className={styles.ingrImage}
                />
              </div>
            );
          })
        : null}
      {extra > 0 && (
        <div className={styles.sixth}>
          <p className={classNames(textDefault, styles.extraValue)}>+{extra}</p>
        </div>
      )}
    </span>
  );
};
