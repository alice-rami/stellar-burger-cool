import classNames from 'classnames';
import styles from './styles.module.css';

interface OrderIngredientImageProps {
  ingredientName: string;
  ingredientImage: string;
  className?: string;
}

export const OrderIngredientImage = ({
  ingredientName,
  ingredientImage,
  className,
}: OrderIngredientImageProps) => {
  return (
    <div className={classNames(styles.ingrImageContainer, className)}>
      <img
        src={ingredientImage || ''}
        alt={ingredientName || ''}
        className={styles.ingrImage}
      />
    </div>
  );
};
