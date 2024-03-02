import { IngredientGroup } from '../ingredient-group/ingredient-group';
import { groupNamesConfig } from './config';
import { IngredientsByGroups } from './container';
import { Tabs } from '../ui/tabs/component';
import styles from './styles.module.css';
import classNames from 'classnames';
import { useIngredientModal } from '../../modal-context/hook';
import { IngredientModal } from '../ui/ingredient-modal/component';
import { IngredientDetails } from '../ingredient-details/component';
import { useNavigate } from 'react-router-dom';

interface IngredientsProps {
  ingredientsByGroups: IngredientsByGroups;
}

export const Ingredients = ({ ingredientsByGroups }: IngredientsProps) => {
  const { ingredientModalData, setIngredientModalData } = useIngredientModal();
  const navigate = useNavigate();

  if (!ingredientsByGroups) {
    return null;
  }

  return (
    <div className={classNames(styles.container)}>
      <Tabs className='mb-10' />
      <div className={classNames(styles.groups, 'custom-scroll')}>
        {groupNamesConfig.map(({ group, title, id }) => (
          <IngredientGroup
            key={id}
            title={title}
            ingredients={ingredientsByGroups[group]}
          />
        ))}
      </div>
      {ingredientModalData.isOpen && (
        <IngredientModal
          onClose={() => {
            setIngredientModalData &&
              setIngredientModalData({
                isOpen: false,
                ingredient: null,
              });
            navigate('/');
          }}
        >
          {ingredientModalData.ingredient && (
            <IngredientDetails ingredient={ingredientModalData.ingredient} />
          )}
        </IngredientModal>
      )}
    </div>
  );
};
