import { useLocation } from 'react-router-dom';
import { useGetOrdersQuery } from '../../../redux/services/feedApi';
import {Loader} from '../../ui/loader/component';
import { Orders } from './component';

export const AllOrdersContainer = () => {
  const location = useLocation().pathname;
  const { data, isFetching, isError } = useGetOrdersQuery();

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

  return <Orders orders={orders} from={location} />;
};
