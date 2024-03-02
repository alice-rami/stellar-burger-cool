import { IngredientGroup } from '../ingredient-group/ingredient-group';
import { groupNamesConfig } from './config';
import { IngredientsByGroups } from './container';
import { Tabs } from '../tabs/component';
import styles from './styles.module.css';
import classNames from 'classnames';

interface IngredientsProps {
  ingredientsByGroups: IngredientsByGroups;
}

export const Ingredients = ({ ingredientsByGroups }: IngredientsProps) => {
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
    </div>
  );
};
