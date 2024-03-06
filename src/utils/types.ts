import { IngredientsTypes } from '../components/ingredients/container';

export type Ingredient = {
  _id: string;
  name: string;
  type: IngredientsTypes;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};
