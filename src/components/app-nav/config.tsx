import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactNode } from 'react';
import { BASE } from '../../utils/constants-urls';

export type NavItem = {
  path: string;
  icon: ReactNode;
  text: string;
};

export const appNavConfig: NavItem[] = [
  {
    path: BASE,
    icon: <BurgerIcon type='primary' />,
    text: 'Конструктор',
  },
  {
    path: `${BASE}feed`,
    icon: <ListIcon type='primary' />,
    text: 'Лента заказов',
  },
  {
    path: `${BASE}profile`,
    icon: <ProfileIcon type='primary' />,
    text: 'Личный кабинет',
  },
];
