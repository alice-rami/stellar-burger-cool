import { error, success } from '../../utils/constants-kit-styles';
import { OrderStatus, OrderTextStatus } from './types';

type OrderStatusConfig = Record<
  OrderStatus,
  { textStatus: OrderTextStatus; textColor?: string }
>;

export const orderStatusConfig: OrderStatusConfig = {
  done: {
    textStatus: 'Выполнен',
    textColor: success,
  },
  pending: {
    textStatus: 'Готовится',
    textColor: success,
  },
  created: {
    textStatus: 'Создан',
  },
  canceled: {
    textStatus: 'Отменён',
    textColor: error,
  },
};
