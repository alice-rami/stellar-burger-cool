import { BASE } from '../../utils/constants-urls';

export const config = {
  profile: {
    key: '1-profile',
    path: `${BASE}profile`,
    title: 'Профиль',
  },
  history: {
    key: '2-profile',
    path: `${BASE}profile/orders`,
    title: 'История заказов',
  },
  logout: {
    key: '3-profile',
    path: `${BASE}login`,
    title: 'Выход',
  },
};
