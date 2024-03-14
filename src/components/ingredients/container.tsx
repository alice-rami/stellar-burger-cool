import { useGetIngredientsQuery } from '../../redux/services/ingredientApi';
import { Ingredient } from '../../utils/types';
import { Loader } from '../ui/loader/component';
import { Ingredients } from './component';

export type IngredientGroups = 'buns' | 'sauces' | 'mains';
export type IngredientsTypes = 'bun' | 'sauce' | 'main';
export type IngredientsByType = Record<IngredientsTypes, Ingredient[]>;

export const IngredientsContainer = () => {
  const { data: ingredientsByType, isLoading } = useGetIngredientsQuery(
    undefined,
    {
      selectFromResult: (result) => {
        const entities = result?.data?.entities;
        const ids = result?.data?.ids;
        const byType: IngredientsByType = {
          bun: [],
          sauce: [],
          main: [],
        };
        if (entities && ids) {
          ids.forEach((id) => {
            const type = entities[id]?.type;
            if (type) {
              byType[type].push(entities[id]);
            }
          });
        }
        return {
          ...result,
          data: byType,
        };
      },
    }
  );

  if (!ingredientsByType) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <Ingredients ingredientsByType={ingredientsByType} />;
};
