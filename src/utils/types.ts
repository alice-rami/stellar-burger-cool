export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type OrderStatus = 'created' | 'pending' | 'done' | 'canceled';
export type OrderTextStatus = 'Выполнен' | 'Готовится' | 'Создан' | 'Отменён';

export interface Order {
  ingredients: string[];
  _id: string;
  status: OrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  ingredientDetails?: IngredientDetails[];
  orderPrice?: number;
}

export interface IngredientDetails {
  ingredientId: string;
  ingredientImage?: string;
  ingredientName?: string;
  ingredientPrice?: number;
  ingredientCount?: number;
}
