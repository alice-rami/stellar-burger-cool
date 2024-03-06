import { useParams } from 'react-router-dom';
import { IngredientDetails } from './component';
import { useGetIngredientsQuery } from '../../redux/services/ingredientApi';
import { useIngredientModal } from '../../modal-context/hook';
import { ConstructorPage } from '../../pages/constructor-page/component';

export const IngredientDetailsContainer = () => {
  const { id } = useParams();
  const { data: ingredient } = useGetIngredientsQuery(undefined, {
    selectFromResult: (result) => {
      return {
        ...result,
        data: id ? result?.data?.entities[id] : null,
      };
    },
  });
  const {
    ingredientModalData: { isOpen },
  } = useIngredientModal();

  if (!ingredient) {
    return null;
  }

  return isOpen ? (
    <ConstructorPage />
  ) : (
    <IngredientDetails ingredient={ingredient} />
  );
};
