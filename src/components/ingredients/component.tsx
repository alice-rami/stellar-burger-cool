import { IngredientGroup } from '../ingredient-group/ingredient-group';
import { groupNamesConfig } from './config';
import { IngredientsByType } from './container';
import { Tabs } from '../ui/tabs/component';
import styles from './styles.module.css';
import classNames from 'classnames';
// import { useIngredientModal } from '../../modal-context/hook';
// import { IngredientModal } from '../ui/ingredient-modal/component';
// import { IngredientDetails } from '../ingredient-details/component';
// import { useNavigate } from 'react-router-dom';
// import { currentIngredientActions } from '../../redux/ui/ingredient';
// import { useAppSelector } from '../../hooks/rtkHooks';
// import { selectModalModule } from '../../redux/ui/modal/selectors';
// import { selectCurrentIngredient } from '../../redux/ui/ingredient/selectors';
// import { modalActions } from '../../redux/ui/modal';

interface IngredientsProps {
  ingredientsByType: IngredientsByType;
}

export const Ingredients = ({ ingredientsByType }: IngredientsProps) => {
  // const navigate = useNavigate();
  // const { isModalOpen } = useAppSelector(selectModalModule);
  // const { ingredient } = useAppSelector(selectCurrentIngredient);

  if (!ingredientsByType) {
    return null;
  }

  return (
    <div className={classNames(styles.container)}>
      <Tabs className='mb-10' />
      <div className={classNames(styles.groups, 'custom-scroll')}>
        {groupNamesConfig.map(({ type, title, id }) => (
          <IngredientGroup
            key={id}
            title={title}
            ingredients={ingredientsByType[type]}
          />
        ))}
      </div>
    </div>
  );
};
