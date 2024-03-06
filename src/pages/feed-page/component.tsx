import Loader from '../../components/ui/loader/component';
import { useGetOrdersQuery } from '../../redux/services/feedApi';

export const FeedPage = () => {
  const { data, isFetching, isError } = useGetOrdersQuery();

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return 'Error';
  }

  if (!data) {
    return null;
  }

  const { orders, total, totalToday } = data;

  return (
    <div>
      <h1>Feed</h1>
      {orders.length > 0 &&
        orders.map((order) => <div key={order._id}>{order.name}</div>)}
      {total && <div>Всего: {total}</div>}
      {totalToday && <div>Сегодня: {totalToday}</div>}
    </div>
  );
};
