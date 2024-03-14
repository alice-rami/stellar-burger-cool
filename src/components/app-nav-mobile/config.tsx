import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const config = {
  profile: {
    key: '1-mobile',
    icon: <ProfileIcon type='primary' />,
    title: 'Личный кабинет',
    path: '/profile',
  },
  constructor: {
    key: '2-mobile',
    icon: <BurgerIcon type='primary' />,
    title: 'Конструктор бургеров',
    path: '/',
  },
  feed: {
    key: '3-mobile',
    icon: <ListIcon type='primary' />,
    title: 'Лента заказов',
    path: '/feed',
  },
};
