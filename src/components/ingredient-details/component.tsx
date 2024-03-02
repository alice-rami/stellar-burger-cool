import classNames from 'classnames';
import { Ingredient } from '../../utils/types';
import styles from './styles.module.css';
import { nutritionFactsConfig } from './config';
import {
  digitsDefault,
  inactive,
  textDefault,
  textL,
  textM,
} from '../../utils/constants-kit-styles';

interface IngredientDetailsProps {
  ingredient: Ingredient;
  className?: string;
}

export const IngredientDetails = ({
  ingredient,
  className,
}: IngredientDetailsProps) => {
  if (!ingredient) {
    return null;
  }

  const { image_large, name } = ingredient;

  return (
    <div className={classNames(className, styles.container)}>
      <h2 className={classNames(textL)}>Детали ингредиента</h2>
      <img
        src={image_large}
        alt={name}
        className={classNames(styles.image, 'mb-4')}
      />
      <h3 className={classNames(textM, styles.name)}>{name}</h3>
      <div className={classNames('mt-8 mb-15', styles.list)}>
        {nutritionFactsConfig.map((item, index) => (
          <li className={styles.listItem} key={index}>
            <p className={classNames(textDefault, inactive)}>{item.title}</p>
            <p className={classNames(digitsDefault, inactive)}>
              {ingredient[item.type]}
            </p>
          </li>
        ))}
      </div>
    </div>
  );
};
