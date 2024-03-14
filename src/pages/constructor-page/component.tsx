import { AppFooter } from '../../components/app-footer/component';
import { BurgerIngredients } from '../../components/burger/burger-ingredients/component';
import { IngredientsContainer } from '../../components/ingredients/container';
import { LayoutTwoColumns } from '../../components/ui/layout-two-columns/component';
import { useScreenSize } from '../../device-context/hook';

interface ConstructorPageProps {
  orderTotal: number;
}

export const ConstructorPage = ({ orderTotal }: ConstructorPageProps) => {
  const { isDesktop } = useScreenSize();

  return (
    <>
      <LayoutTwoColumns title='Cоберите бургер'>
        <IngredientsContainer />
        {isDesktop && <BurgerIngredients />}
        {!isDesktop && <AppFooter orderTotal={orderTotal} />}
      </LayoutTwoColumns>
    </>
  );
};
