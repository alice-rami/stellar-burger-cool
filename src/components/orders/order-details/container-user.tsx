import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../../redux/services/feedApi';
import { Modal } from '../../ui/modal/component';
import { FeedPage } from '../../../pages/feed-page/component';
import { OrderDetails } from './component';
import { useOrderIngredientDetails } from '../../../hooks/useOrderIngredientDetails';

export const OrderDetailsUserContainer = () => {
  const { id } = useParams();
  const location = useLocation();
  const isFromHistory =
    location.state && location.state.from === '/profile/orders';
  const navigate = useNavigate();
  const { data: order } = useGetUserOrdersQuery(undefined, {
    selectFromResult: (result) => {
      return {
        ...result,
        data: id
          ? result?.data?.orders?.find((order) => order.number === Number(id))
          : null,
      };
    },
  });

  const ingredientsData = useOrderIngredientDetails(order?.ingredients || []);

  if (!order) {
    return null;
  }
  const orderTotal = ingredientsData.reduce(
    (acc, curr) => acc + curr.ingredientPrice,
    0
  );
  const uniqueIngredientsData = Array.from(
    new Map(ingredientsData.map((m) => [m.ingredientId, m])).values()
  );

  return isFromHistory ? (
    <>
      <FeedPage />
      <Modal
        onClose={() => {
          navigate('/profile/orders'), { state: null };
        }}
      >
        <OrderDetails
          order={order}
          uniqueIngredientsData={uniqueIngredientsData}
          orderTotal={orderTotal}
        />
      </Modal>
    </>
  ) : (
    <OrderDetails
      order={order}
      uniqueIngredientsData={uniqueIngredientsData}
      orderTotal={orderTotal}
    />
  );
};
