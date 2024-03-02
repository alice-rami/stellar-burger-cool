import { textM } from '../../utils/constants-kit-styles';
import { Ingredient as IngredientEntity } from '../../utils/types';
import { Ingredient } from '../ingredient/ingredient';
import styles from './styles.module.css';

interface IngredientGroupProps {
  ingredients: IngredientEntity[];
  title: string;
  className?: string;
}

export const IngredientGroup = ({
  ingredients,
  title,
  className,
}: IngredientGroupProps) => {
  if (!ingredients) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className={textM}>{title}</h2>
      <div className={styles.container}>
        {ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
};
