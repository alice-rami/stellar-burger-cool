export type TabId = 'one' | 'two' | 'three';
export type TabsData = {
  value: TabId;
  title: string;
  groupId: string;
  type: string;
};

export const tabsData: TabsData[] = [
  { value: 'one', title: 'Булки', groupId: 'buns', type: 'bun' },
  { value: 'two', title: 'Соусы', groupId: 'sauces', type: 'sauce' },
  { value: 'three', title: 'Начинки', groupId: 'mains', type: 'main' },
];
