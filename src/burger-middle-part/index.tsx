import styles from './styles.module.css';
import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { BurgerMidIngredient } from '../burger-mid-ingredient';
import { useScreenSize } from '../device-context/hook';
import { IngredientWithUId, burgerActions } from '../redux/ui/burger';
import { useAppDispatch } from '../hooks/rtkHooks';
import { Ingredient } from '../utils/types';
import classNames from 'classnames';
import { textM } from '../utils/constants-kit-styles';

interface BurgerMiddlePartProps {
  midPart: IngredientWithUId[];
}

export const BurgerMiddlePart = ({ midPart = [] }: BurgerMiddlePartProps) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useScreenSize();

  const [{ isOver }, dropRef] = useDrop({
    accept: ['sauce', 'main'],
    drop(ingredient: Ingredient) {
      dispatch(burgerActions.addMidPartIngredient(ingredient));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const findCard = useCallback(
    (uid: string) => {
      const index = midPart.findIndex((item) => item.uid === uid);
      return {
        index,
      };
    },
    [midPart]
  );

  const moveCard = useCallback(
    (uid: string, atIndex: number) => {
      const { index } = findCard(uid);
      dispatch(burgerActions.moveMidPartIngredient({ index, atIndex }));
    },
    [findCard, dispatch]
  );

  return (
    <ul
      className={classNames(styles.container, 'custom-scroll', {
        [styles.draggedOver]: isOver,
      })}
      ref={dropRef}
    >
      {midPart.length === 0 ? (
        <p className={classNames(styles.placeholder, textM)}>
          Выберите начинку
        </p>
      ) : (
        midPart.map((item, index) => {
          return (
            <li key={item.uid}>
              <BurgerMidIngredient
                index={index}
                uid={item.uid}
                moveCard={moveCard}
                findCard={findCard}
                ingredient={item}
                isMobile={isMobile}
              />
            </li>
          );
        })
      )}
    </ul>
  );
};
