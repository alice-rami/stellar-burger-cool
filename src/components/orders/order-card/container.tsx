import { useNavigate } from 'react-router-dom';
import OrderCard from './component';
import { Order } from '../types';
import { useOrderIngredientDetails } from '../../../hooks/useOrderIngredientDetails';

interface OrderCardContainerProps {
  order: Order;
  from: string;
}

export const OrderCardContainer = ({
  order,
  from,
}: OrderCardContainerProps) => {
  const navigate = useNavigate();

  const ingredientsData = useOrderIngredientDetails(order.ingredients);
  const extra = ingredientsData.length - 5 || 0;
  const firstIngredients = ingredientsData.slice(0, 5) || [];
  const orderTotal = ingredientsData.reduce(
    (acc, curr) => acc + curr.ingredientPrice,
    0
  );
  const { number } = order;

  const showOrderDetails = () => {
    navigate(`${from}/${number}`, { state: { from: from } });
  };
  return (
    <OrderCard
      order={order}
      showOrderDetails={showOrderDetails}
      firstIngredients={firstIngredients}
      extra={extra}
      orderTotal={orderTotal}
    />
  );
};
