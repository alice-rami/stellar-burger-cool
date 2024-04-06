import { forwardRef } from 'react';
import { textM } from '../../utils/constants-kit-styles';
import { Ingredient as IngredientEntity } from '../../utils/types';
import { Ingredient } from '../ingredient/component';
import styles from './styles.module.css';

interface IngredientGroupProps {
  ingredients: IngredientEntity[];
  title: string;
  id: string;
  className?: string;
}

export const IngredientGroup = forwardRef(function BurgerIngredientGroup(
  { ingredients, title, id, className }: IngredientGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  if (!ingredients) {
    return null;
  }

  return (
    <div className={className} id={id} ref={ref}>
      <h2 className={textM}>{title}</h2>
      <div className={styles.container}>
        {ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
});
