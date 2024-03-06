import { OrderIngredientDetails } from '../components/orders/types';
import { useGetIngredientsQuery } from '../redux/services/ingredientApi';

export function useOrderIngredientDetails(
  ingredientIds: string[]
): OrderIngredientDetails[] {
  // filter null
  const realIndgredientIds = ingredientIds.filter((i) => i);
  // calculate ingredient count
  const ingredientCount: Record<string, number> = {};
  realIndgredientIds.forEach((id) => {
    ingredientCount[id] ? ingredientCount[id] + 1 : 1;
  });

  // prepare ingredient data for OrderCard:
  // pick the required ingredient fields from the store
  // add ingredientCount field
  const { data: orderIngredients, isError } = useGetIngredientsQuery(
    undefined,
    {
      selectFromResult: (result) => {
        const ingredientData: OrderIngredientDetails[] = [];
        realIndgredientIds.forEach((id) => {
          const ingredient = result.data?.entities[id];
          if (ingredient) {
            const { _id, name, price, image_mobile } = ingredient;
            ingredientData.push({
              ingredientId: _id,
              ingredientImage: image_mobile,
              ingredientName: name,
              ingredientPrice: price,
              ingredientCount: ingredientCount[id],
            });
          }
        });
        return {
          ...result,
          data: ingredientData,
        };
      },
    }
  );

  if (isError) {
    console.log('Error');
  }

  return orderIngredients;
}
