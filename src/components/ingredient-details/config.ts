import { Ingredient } from '../../utils/types';

export type IngredientNutritionFacts = Pick<
  Ingredient,
  'calories' | 'proteins' | 'fat' | 'carbohydrates'
>;
interface NutritionFact {
  type: keyof IngredientNutritionFacts;
  title: string;
}

export const nutritionFactsConfig: NutritionFact[] = [
  { type: 'calories', title: 'Калории, ккал' },
  { type: 'proteins', title: 'Белки, г' },
  { type: 'fat', title: 'Жиры, г' },
  { type: 'carbohydrates', title: 'Углеводы, г' },
];
