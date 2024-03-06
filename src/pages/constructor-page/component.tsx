import { BurgerIngredients } from '../../components/burger/burger-ingredients/component';
import { IngredientsContainer } from '../../components/ingredients/container';
import { LayoutTwoColumns } from '../../components/ui/layout-two-columns/component';

export const ConstructorPage = () => {
  return (
    <LayoutTwoColumns title='Cоберите бургер'>
      <IngredientsContainer />
      <BurgerIngredients />
    </LayoutTwoColumns>
  );
};
