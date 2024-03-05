import { IngredientGroups } from './container';

export type GroupData = {
  group: IngredientGroups;
  id: string;
  title: string;
};
export const groupNamesConfig: GroupData[] = [
  {
    group: 'buns',
    id: 'one',
    title: 'Булки',
  },
  {
    group: 'sauces',
    id: 'two',
    title: 'Соусы',
  },
  {
    group: 'mains',
    id: 'three',
    title: 'Начинки',
  },
];
