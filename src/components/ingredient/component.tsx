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
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { burgerActions } from '../../redux/ui/burger';
import { selectIngredientCount } from '../../redux/ui/burger/selectors';
import { BASE } from '../../utils/constants-urls';

interface IngredientProps {
  ingredient: IngredientEntity;
}

export const Ingredient = ({ ingredient }: IngredientProps) => {
  const { isMobile, isDesktop } = useScreenSize();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { image, image_mobile, name, type, price, _id } = ingredient;
  const count = useAppSelector((state) => selectIngredientCount(state, _id));

  const [{ isDragging }, dragRef] = useDrag({
    type: type,
    item: { image_mobile, price, name, type, _id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (!ingredient) {
    return null;
  }

  const addIngredient = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (type === 'bun') {
      dispatch(burgerActions.addBun(ingredient));
    } else {
      dispatch(burgerActions.addMidPartIngredient(ingredient));
    }
  };

  return (
    <article
      className={classNames(styles.container, {
        [styles.dragging]: isDragging,
      })}
      ref={dragRef}
    >
      {count !== 0 && (
        <Counter
          count={count}
          size={isMobile ? 'small' : 'default'}
          extraClass={styles.counter}
        />
      )}
      <img
        src={isMobile ? image_mobile : image}
        alt={name}
        className={styles.image}
        onClick={() => {
          navigate(`${BASE}ingredients/${_id}`, {
            state: { from: 'ingredients' },
          });
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
        <Button
          htmlType='submit'
          type='secondary'
          size='medium'
          onClick={addIngredient}
        >
          Добавить
        </Button>
      )}
    </article>
  );
};
