import { useNavigate, useParams } from 'react-router-dom';
import { IngredientDetails } from './component';
import { useGetIngredientsQuery } from '../../redux/services/ingredientApi';
import { ConstructorPage } from '../../pages/constructor-page/component';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { selectModalModule } from '../../redux/ui/modal/selectors';
import { modalActions } from '../../redux/ui/modal';
import { Modal } from '../ui/modal/component';

export const IngredientDetailsContainer = () => {
  const { id } = useParams();
  const { isModalOpen } = useAppSelector(selectModalModule);
  const dispatch = useAppDispatch();
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

  return isModalOpen ? (
    <>
      <ConstructorPage />
      <Modal
        onClose={() => {
          dispatch(modalActions.closeModal());
          navigate('/');
        }}
      >
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  ) : (
    <IngredientDetails ingredient={ingredient} />
  );
};
