import { IngredientGroup } from '../ingredient-group/ingredient-group';
import { IngredientsByType } from './container';
import styles from './styles.module.css';
import classNames from 'classnames';
import { useGroupRefs } from '../../../hooks/useGroupRefs';
import { Ref, TabsIngredients } from '../tabs-ingredients/component';
import { MutableRefObject } from 'react';
import { tabsData } from '../tabs-ingredients/config';

interface IngredientsProps {
  ingredientsByType: IngredientsByType;
}

export const Ingredients = ({ ingredientsByType }: IngredientsProps) => {
  const { visibleGroup, groupRefs, setSectionRefs } = useGroupRefs();
  if (!ingredientsByType) {
    return null;
  }

  return (
    <div className={classNames(styles.container)}>
      <TabsIngredients
        className='mb-10'
        visibleGroup={visibleGroup}
        refs={groupRefs as MutableRefObject<Ref>}
        tabsData={tabsData}
      />
      <div className={classNames(styles.groups, 'custom-scroll')}>
        {tabsData.map(({ value, title, type }, index) => (
          <IngredientGroup
            key={index}
            id={value}
            title={title}
            ingredients={ingredientsByType[type]}
            ref={setSectionRefs}
          />
        ))}
      </div>
    </div>
  );
};
