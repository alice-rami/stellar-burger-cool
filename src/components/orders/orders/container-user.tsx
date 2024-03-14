import { useLocation } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../../redux/services/feedApi';
import Loader from '../../ui/loader/component';
import { Orders } from './component';

export const UserOrdersContainer = () => {
  const { pathname } = useLocation();
  const { data, isFetching, isError } = useGetUserOrdersQuery();

  if (isError) {
    return 'Error';
  }

  if (isFetching) {
    return <Loader />;
  }

  const orders = data?.orders;
  if (!orders || orders.length === 0) {
    return null;
  }

  return (
      <Orders orders={orders} from={pathname} />
  );
};
