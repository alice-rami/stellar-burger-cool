import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../../redux/services/feedApi';
import { useAppSelector } from '../../../hooks/rtkHooks';
import { selectModalModule } from '../../../redux/ui/modal/selectors';
import { Modal } from '../../ui/modal/component';
import { FeedPage } from '../../../pages/feed-page/component';
import { OrderDetails } from './component';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../redux/ui/modal';
import { useOrderIngredientDetails } from '../../../hooks/useOrderIngredientDetails';

export const OrderDetailsUserContainer = () => {
  const { id } = useParams();
  const { isModalOpen } = useAppSelector(selectModalModule);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: order } = useGetUserOrdersQuery(undefined, {
    selectFromResult: (result) => {
      return {
        ...result,
        data: id
          ? result?.data.orders.find((order) => order.number === Number(id))
          : null,
      };
    },
  });

  const ingredientsData = useOrderIngredientDetails(order.ingredients);
  const orderTotal = ingredientsData.reduce(
    (acc, curr) => acc + curr.ingredientPrice,
    0
  );
  const uniqueIngredientsData = Array.from(
    new Map(ingredientsData.map((m) => [m.ingredientId, m])).values()
  );

  return isModalOpen ? (
    <>
      <FeedPage />
      <Modal
        onClose={() => {
          dispatch(modalActions.closeModal());
          navigate('/profile/orders');
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
