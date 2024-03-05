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
import { useIngredientModal } from '../../modal-context/hook';
import { useNavigate } from 'react-router-dom';

interface IngredientProps {
  ingredient: IngredientEntity;
}

export const Ingredient = ({ ingredient }: IngredientProps) => {
  const { isMobile, isDesktop } = useScreenSize();
  const { setIngredientModalData } = useIngredientModal();
  const navigate = useNavigate();

  if (!ingredient) {
    return null;
  }

  const { image, image_mobile, name, price, _id } = ingredient;

  return (
    <article className={styles.container}>
      <Counter count={1} size={isMobile ? 'small' : 'default'} />
      <img
        src={isMobile ? image_mobile : image}
        alt={name}
        className={styles.image}
        onClick={() => {
          setIngredientModalData &&
            setIngredientModalData({
              isOpen: true,
              ingredient: ingredient,
            });
          navigate(`/ingredients/${_id}`);
        }}
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
