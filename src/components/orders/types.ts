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
}

export interface OrderWithIngredientsPrice extends Order {
  ingredientDetails: OrderIngredientDetails[];
  orderPrice: number;
}

export interface OrderIngredientDetails {
  ingredientId: string;
  ingredientImage: string;
  ingredientName: string;
  ingredientPrice: number;
  ingredientCount: number;
}
