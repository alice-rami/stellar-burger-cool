import { useGetIngredientsQuery } from '../../redux/services/ingredientApi';
import { Ingredient } from '../../utils/types';
import Loader from '../ui/loader/component';
import { Ingredients } from './component';

export type IngredientGroups = 'buns' | 'sauces' | 'mains';
export type IngredientsByGroups = Record<IngredientGroups, Ingredient[]>;

export const IngredientsContainer = () => {
  const { data: ingredientsByGroups, isLoading } = useGetIngredientsQuery(
    undefined,
    {
      selectFromResult: (result) => {
        return {
          ...result,
          data: result?.data?.reduce(
            (acc: IngredientsByGroups, item) => {
              acc[`${item.type}s` as IngredientGroups].push(item);
              return acc;
            },
            {
              buns: [],
              sauces: [],
              mains: [],
            }
          ),
        };
      },
    }
  );

  if (!ingredientsByGroups) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <Ingredients ingredientsByGroups={ingredientsByGroups} />;
};
