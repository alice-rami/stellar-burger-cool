import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetOrdersQuery } from '../../../redux/services/feedApi';
import { Modal } from '../../ui/modal/component';
import { FeedPage } from '../../../pages/feed-page/component';
import { OrderDetails } from './component';
import { useOrderIngredientDetails } from '../../../hooks/useOrderIngredientDetails';
import { BASE } from '../../../utils/constants-urls';

export const OrderDetailsAllContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isFromFeed = location.state && location.state.from === `${BASE}feed`;
  const { data: order } = useGetOrdersQuery(undefined, {
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

  return isFromFeed ? (
    <>
      <FeedPage />
      <Modal
        onClose={() => {
          navigate(`${BASE}feed`), { state: null };
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
