import { IngredientGroup } from '../ingredient-group/ingredient-group';
import { groupNamesConfig } from './config';
import { IngredientsByType } from './container';
import { Tabs } from '../ui/tabs/component';
import styles from './styles.module.css';
import classNames from 'classnames';

interface IngredientsProps {
  ingredientsByType: IngredientsByType;
}

export const Ingredients = ({ ingredientsByType }: IngredientsProps) => {
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
