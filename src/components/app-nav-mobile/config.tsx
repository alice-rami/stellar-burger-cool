import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BASE } from '../../utils/constants-urls';

export const config = {
  profile: {
    key: '1-mobile',
    icon: <ProfileIcon type='primary' />,
    title: 'Личный кабинет',
    path: `${BASE}profile`,
  },
  constructor: {
    key: '2-mobile',
    icon: <BurgerIcon type='primary' />,
    title: 'Конструктор бургеров',
    path: BASE,
  },
  feed: {
    key: '3-mobile',
    icon: <ListIcon type='primary' />,
    title: 'Лента заказов',
    path: `${BASE}feed`,
  },
};
