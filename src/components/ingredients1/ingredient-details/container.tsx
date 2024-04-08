import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IngredientDetails } from './component';
import { useGetIngredientsQuery } from '../../../redux/services/ingredientApi';
import { Modal } from '../../ui/modal/component';
import { ConstructorPageContainer } from '../../../pages/constructor-page/container';
import { BASE } from '../../../utils/constants-urls';

export const IngredientDetailsContainer = () => {
  const { id } = useParams();
  const location = useLocation();
  const isFromIngredients =
    location.state && location.state.from === 'ingredients';

  const navigate = useNavigate();
  const { data: ingredient } = useGetIngredientsQuery(undefined, {
    selectFromResult: (result) => {
      return {
        ...result,
        data: id ? result?.data?.entities[id] : null,
      };
    },
  });

  if (!ingredient) {
    return null;
  }

  return isFromIngredients ? (
    <>
      <ConstructorPageContainer />
      <Modal
        onClose={() => {
          navigate(BASE), { state: null };
        }}
      >
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  ) : (
    <IngredientDetails ingredient={ingredient} />
  );
};
