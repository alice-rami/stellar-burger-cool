export type TabId = 'one' | 'two' | 'three';
export type FeedTabsData = {
  value: TabId;
  title: string;
  groupId: string;
};

export const feedTabsData: FeedTabsData[] = [
  { value: 'one', title: 'Заказы', groupId: 'orders' },
  { value: 'two', title: 'Статистика', groupId: 'statistics' },
];
