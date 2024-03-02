import {
  Button,
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient as IngredientEntity } from '../../utils/types';
import styles from './styles.module.css';
import { useScreenSize } from '../../device-context/hook';
import {
  digitsDefault,
  textDefault,
  textS,
} from '../../utils/constants-kit-styles';
import classNames from 'classnames';

interface IngredientProps {
  ingredient: IngredientEntity;
}

export const Ingredient = ({ ingredient }: IngredientProps) => {
  const { isMobile, isDesktop } = useScreenSize();

  if (!ingredient) {
    return null;
  }

  const { image, image_mobile, name, price } = ingredient;

  return (
    <article className={styles.container}>
      <Counter count={1} size={isMobile ? 'small' : 'default'} />
      <img
        src={isMobile ? image_mobile : image}
        alt={name}
        className={styles.image}
      />
      <span className={`${styles.priceContainer} pt-1 pb-1`}>
        <p className={digitsDefault}>{price}</p>
        <CurrencyIcon type='primary' />
      </span>
      <h3 className={classNames(styles.title, isMobile ? textS : textDefault)}>
        {name}
      </h3>
      {!isDesktop && (
        <Button htmlType='submit' type='secondary' size='medium'>
          Добавить
        </Button>
      )}
    </article>
  );
};
