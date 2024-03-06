import { IngredientGroups, IngredientsTypes } from './container';

export type GroupData = {
  group: IngredientGroups;
  type: IngredientsTypes;
  id: string;
  title: string;
};
export const groupNamesConfig: GroupData[] = [
  {
    group: 'buns',
    type: 'bun',
    id: 'one',
    title: 'Булки',
  },
  {
    group: 'sauces',
    type: 'sauce',
    id: 'two',
    title: 'Соусы',
  },
  {
    group: 'mains',
    type: 'main',
    id: 'three',
    title: 'Начинки',
  },
];
