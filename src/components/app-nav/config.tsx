import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactNode } from 'react';

export type NavItem = {
  path: string;
  icon: ReactNode;
  text: string;
};

export const appNavConfig: NavItem[] = [
  {
    path: '/',
    icon: <BurgerIcon type='primary' />,
    text: 'Конструктор',
  },
  {
    path: '/feed',
    icon: <ListIcon type='primary' />,
    text: 'Лента заказов',
  },
  {
    path: '/profile',
    icon: <ProfileIcon type='primary' />,
    text: 'Личный кабинет',
  },
];
